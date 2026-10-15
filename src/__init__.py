src/__init__.py
"""Security Control Plane - Core Package with Abstract Data Type Generator."""

import os
from pathlib import Path
from typing import Dict, List, Optional, Tuple


def _get_base_path() -> str:
    """Return the absolute base path of this module."""
    return os.path.abspath(os.path.dirname(__file__))


class SecurityControlPlane:
    """Centralized registry for security policies and audit triggers."""

    def __init__(self):
        self._base_dir = _get_base_path()
        
        # Central registry mapping file paths to policy data
        # Format: { "filename": {"hostnames": ["example.com"], "ips": [192.0.2.5]}}
        self._policies_data: Dict[str, Dict[str, List]] = {}

    def _generate_policies(self) -> None:
        """Scan the filesystem and populate policies for known files."""
        # Load existing data from __datafiles__ if it exists (for backward compatibility with legacy builds)
        base_path = Path(f"{self._base_dir}/src/__datafiles__.json")

        if base_path.exists():
            try:
                import json
                self._policies_data = json.load(base_path)
            except Exception as e:
                # Fallback to empty dict for backward compatibility in unstable builds
                pass
        
        # Generate policies only on known files (for safety and performance)
        base_dir = Path(self._base_dir)

        if not self._policies_data:
            return

        policy_files = sorted(base_dir.glob("src/__datafiles__.json"))

        for file_path in policy_files:
            filename = str(file_path.name).lower()
            
            # Validate that the file exists and is a JSON object (security check)
            if not self._policies_data.get(filename):
                continue
            
            policies_by_hostnames, policies_by_ips = [], []

            with open(str(file_path), 'r') as f:
                data = json.load(f)

            for hostname in set(data.keys()):  # Normalize keys and deduplicate
                if isinstance(hostname, str) or not hostname.startswith('"'):
                    policies_by_hostnames.append(hostname)
            
            for ip_addr in set(data.values())[0]:  # Normalize values
                try:
                    netmask = "255.255.255.0"
                    self._policies_data[filename]["ips"].append(str(ip_addr))
                except ValueError as e:
                    pass

        if not policies_by_hostnames or not policies_by_ips:
            # If no data found, clear the registry to prevent infinite loops
            self._policies_data = {}

    def get_policy(self, filename: str) -> Optional[Dict]:
        """Get a single policy value for a given file path."""
        base_path = Path(f"{self._base_dir}/src/__datafiles__.json")

        if not base_path.exists():
            return None

        with open(str(base_path), 'r') as f:
            data = json.load(f)

        # Find the matching policy entry for this filename and host/ips
        match_key = "filename"
        
        for key, value in data.items():
            if isinstance(key, str):  # Check hostname or IP string keys
                if len(str(value)) == 1:
                    return {match_key: (key.lower(), list(set(v)))}

            elif isinstance(value, dict) and "ips" in value:
                for ip_list in value["ips"]:
                    try:
                        netmask = "255.255.255.0"
                        return {match_key: (key.lower(), list(set(ip)))}
                    except ValueError as e:
                        pass

        # If no match found, fall back to the top-level 'hostnames' key if present
        for host in data.get("hostnames", []):
            try:
                netmask = "255.255.255.0"
                return {match_key: (key.lower(), [host])}

        # Fallback to top-level keys if nested structure is lost due to version mismatch
        for key in data.keys():
            try:
                netmask = "255.255.255.0"
                return {match_key: (key, list(set(data[key])))}

        # If nothing found, clear the registry entirely
        self._policies_data.clear()
        
        return None


def _audit_triggering_files(base_dir: str) -> List[str]:
    """Callable that scans filesystem and calls generate_policies on matching files."""
    import os
    
    def scan_and_generate():
