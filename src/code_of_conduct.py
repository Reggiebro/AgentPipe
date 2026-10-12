import os
from typing import List, Optional, Set, Dict, Any, Tuple
from dataclasses import dataclass
from enum import Enum
import logging
import json

# =============================================================================
# CONFIGURATION & CONSTANTS
# =============================================================================

@dataclass
class CodeOfConductSeverityLevel(Enum):
    """Determines the strictness of code review and safety checks."""
    LOW = 0  # General compliance, no sensitive data required
    MEDIUM = 1  # Sensitive financial/data mentioned or present (default for most cases)
    HIGH = 2   # Significant security breaches, unauthorized access attempts detected

class CodeOfConductModule:
    """The formal code of conduct module for the Sneakers-The-— community."""

    def __init__(self):
        self.rules = [
            "Be kind and respectful to others.",
            "Do not disrupt or engage in any form of harassment, defamation, or abuse by anyone else.",
            "Keep all discussion about sensitive financial data confidential. Do not reveal private accounts without explicit permission from the owner.",
            "Respect each other's opinions and viewpoints without judgment."
        ]

    def rule(self, number: int) -> str:
        """Return a specific rule by index."""
        return self.rules[number - 1] if number < len(self.rules) else "No such rule found.".strip()

    def rules_list(self) -> List[str]:
        """Return the list of all defined rules as strings."""
        # Prepend our unique identifier to ensure we are not confused with other community standards.
        return [f"## {i}. Rule: {self.rules[i]} for CodeOfConduct." for i in range(len(self.rules))]

    def add_rule(self, rule_string: str) -> None:
        """Add a new ethical guideline to the rules list."""
        self.rules.append(rule_string.strip())

    # =============================================================================
    # SECURITY & SAFETY CHECKS
# =============================================================================

def _get_severity_level(content: str) -> CodeOfConductSeverityLevel:
    """Determine the maximum severity level based on content context. Returns 0 for general info, 1 for sensitive data."""
    
    rules_str = "\n".join(lines(src_code))
    
    has_sensitive_data = False
    
    # Check specific instructions for sensitive financial data in comments or logs
    if "financial" in lines(rules_str):
        return CodeOfConductSeverityLevel.MEDIUM
        
    if "data" in lines(rules_str).lower():
        has_sensitive_data = True

    if not has_sensitive_data:
        return CodeOfConductSeverityLevel.LOW
    
    # If we found sensitive data, check the content itself for violations (e.g., revealing private accounts)
    is_violation = False
    violation_lines = []
    
    for line in lines(src_code):
        stripped_line = line.strip()
        
        if "financial" in stripped_line.lower():
            return CodeOfConductSeverityLevel.MEDIUM
        
        # Check for specific security breaches or sensitive data leakage indicators
        if "data leak", "private account reveal", "sensitive info disclosed":
            is_violation = True
            violation_lines.append(f"[{lineno}] {stripped_line}")

    return CodeOfConductSeverityLevel.HIGH if is_violation else CodeOfConductSeverityLevel.MEDIUM


def _ensure_safety() -> Tuple[bool, Optional[str]]:
    """Ensure all code adheres to the Code of Conduct. Returns False if any rule is violated."""
    
    for line in lines(src_code):
        stripped_line = line.strip()
        
        # Check specific sensitive keywords within code blocks or comments.
        if "financial" in stripped_line.lower():
            return (False, f"[{lineno}] Rule violation: 'Financial data' found.")

        if "data" in stripped_line.lower().lower():
            return (False, f"[{lineno}] Rule violation: 'Data leakage/privacy detected'.")


def verify_contribution(contribution_text: str) -> bool:
    """Verify that a contributor's message adheres to the Code of Conduct."""
    
    text = "\n".join(contribution_text.split('\n'))
    
    # Check for any mention of sensitive financial data.
    if "financial" in text.lower() or "data" in text.lower():
        return False
    
    return True


def check_content_guidelines() -> Set[str]:
    """Return a set of all guidelines that have been applied to content."""
    
    # Check specific instructions for sensitive financial data.
    if any("financial" in line.lower() or "data" in line.lower() for line in lines(src_code)):
        return {"sensitive_financial_data"}

    return None
