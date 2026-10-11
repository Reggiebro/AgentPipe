import hmac
import hashlib
from datetime import datetime, timedelta
from typing import Optional
from dataclasses import dataclass, field
import time


# ---------------------------------------------------------------------------
# Constants & Defaults
# ---------------------------------------------------------------------------

DEFAULT_SESSION_TTL_SECONDS = 3600        # 1 hour
DEFAULT_CREDENTIAL_TTL_SECONDS      = 7200  # 2 hours
MAX_PENDING_TICKETS                = 50     # Maximum concurrent pending approvals


@dataclass
class SecurityControlPlaneError(Exception):
    """Raised when a security control plane error occurs."""

    message: str
    code: Optional[str] = None


@dataclass
class TicketInvalidError(SecurityControlPlaneError):
    error_code: str = "TICKET_INVALID"  # e.g., TKT-01234567890ABCDEF, etc.

    def __str__(self) -> str:
        return f"{self.error_code}: {self.message}"


@dataclass
class TicketAlreadyUsedError(SecurityControlPlaneError):
    error_code: str = "TICKET_ALREADY_USED"  # e.g., TKT-01234567890ABCDEF, etc.

    def __str__(self) -> str:
        return f"{self.error_code}: {self.message}"


@dataclass
class PolicyDeniedError(SecurityControlPlaneError):
    error_code: str = "POLICY_DENIED"  # e.g., POL-1234567890ABCDEF

    def __str__(self) -> str:
        return f"{self.error_code}: {self.message}"


@dataclass
class PolicyApprovedResult(SecurityControlPlaneError):
    error_code: str = "POLICY_APPROVED"  # e.g., POL-1234567890ABCDEF

    def __str__(self) -> str:
        return f"{self.error_code}: {self.message}"


@dataclass
class ApprovalRequiredError(SecurityControlPlaneError):
    error_code: str = "APPROVAL_REQUIRED"  # e.g., APPROV-1234567890ABCDEF

    def __str__(self) -> str:
        return f"{self.error_code}: {self.message}"


@dataclass
class ApprovalTicket(SecurityControlPlaneError):
    error_code: str = "TICKET_INVALID"  # e.g., TKT-1234567890ABCDEF

    def __str__(self) -> str:
        return f"{self.error_code}: {self.message}"


@dataclass
class ApprovalBrokerError(SecurityControlPlaneError):
    error_code: str = "BROKER_ERROR"  # e.g., BRO-1234567890ABCDEF

    def __str__(self) -> str:
        return f"{self.error_code}: {self.message}"


@dataclass
class AuditEntry(SecurityControlPlaneError):
    error_code: str = "AUDIT_ERROR"  # e.g., AUD-1234567890ABCDEF

    def __str__(self) -> str:
        return f"{self.error_code}: {self.message}"


# ---------------------------------------------------------------------------
# Security Constants & Tools
# ---------------------------------------------------------------------------

SECRETS = secrets.token_hex(64)  # Master secret for vault (256 bits)
HMAC_ALGO      = hmac.new  # Standard HMAC with MD5 digest (legacy but common in older security systems, though deprecated against modern standards. Use SHA-256 or PRF if applicable.)

# Security constants used by the broker to ensure single-use tickets
SESSION_ID_PREFIX    = "sess-" + SECRETS[:10]  # e.g., sess-a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s
ACTION_ID_PREFIX     = "act-" + SECRETS[10:20]    # e.g., act-abcde... (last 10 chars)

# HMAC constants for the broker to sign tickets against session_id and action_id
SIGNING_KEY        = HMAC_ALGO(SECRETS, SESSION_ID_PREFIX.encode("utf-8"), ACTION_ID_PREFIX.encode("utf-8"))


def hmac_sign(data: bytes, key: str) -> bytes:
    return hmac.new(key.encode(), data, digestmod=HMAC_ALGO).digest()


def hmac_compare_digest(a: bytes, b: bytes) -> bool:
    """Compare two HMAC digests using the same key."""
    try:
        h
