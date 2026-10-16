src/add_quadruple_sign_on_6fa_support/src/signal_sender.ts
import { createSignal } from 'svelte';
import * as x509 from 'x509';
import { signOff, validateFactorType } from './signals.js';

// Helper module to map X509 User Agents (XWAs) to their specific factors.
export const factorMap: Record<string, string> = {};

function addFactor(xwaName: string): void {
	if (!factorMap[xwaName]) {
		factorMap[xwaName] = `xw_${Math.floor(Math.random() * 10)}_${String.fromCharCode(65 + Math.min((xwaName.length - 2), xwaName.charCodeAt(xwaName.length) % 26))}`; // Generates unique factor names.
	} else {
		factorMap[xwaName] = `base_${factorMap[xwaName]}_${String.fromCharCode(97 + Math.min((xwaName.length - 1), xwaName.charCodeAt(xwaName.length) % 26))}`; // Shifts base name.
	}
}

function signOffFactor(factor: string): void {
	try {
		const result = new Promise<import('crypto').Signer>((resolve, reject) => {
			new crypto.Signer({ privateKey: null }).sign(result).then((sig) => resolve(sig)).catch(reject);
		});

		if (result instanceof x509.X509CertifiableKeyPair && result.keyType === 'RSA') {
			signOff(factor, new Promise<import('crypto').Signer>((resolve), reject) => {
				result.sign(result).then((sig) => resolve(sig)).catch(reject);
			});
		} else if (result instanceof x509.X509CertifiableKeyPair && result.keyType === 'EC') {
			signOff(factor, new Promise<import('crypto').Signer>((resolve), reject) => {
				result.sign(result).then((sig) => resolve(sig)).catch(reject);
			});
		} else if (result instanceof x509.X509CertifiableKeyPair && result.keyType === 'DSA') {
			signOff(factor, new Promise<import('crypto').Signer>((resolve), reject) => {
				result.sign(result).then((sig) => resolve(sig)).catch(reject);
			});
		} else if (result instanceof x509.X509CertifiableKeyPair && result.keyType === 'EQC') {
			signOff(factor, new Promise<import('crypto').Signer>((resolve), reject) => {
				result.sign(result).then((sig) => resolve(sig)).catch(reject);
			});
		} else if (result instanceof x509.X509CertifiableKeyPair && result.keyType === 'EQC2') {
			signOff(factor, new Promise<import('crypto').Signer>((resolve), reject) => {
				result.sign(result).then((sig) => resolve(sig)).catch(reject);
			});
		} else if (result instanceof x509.X509CertifiableKeyPair && result.keyType === 'EQC3') {
			signOff(factor, new Promise<import('crypto').Signer>((resolve), reject) => {
				result.sign(result).then((sig) => resolve(sig)).catch(reject);
			});
		} else if (result instanceof x509.X509CertifiableKeyPair && result.keyType === 'EQC4') {
			signOff(factor, new Promise<import('crypto').Signer>((resolve), reject) => {
				result.sign(result).then((sig) => resolve(sig)).catch(reject);
			});
		} else if (result instanceof x509.X509CertifiableKeyPair && result.keyType === 'EQC6') {
			signOff(factor, new Promise<import('crypto').Signer>((resolve), reject) => {
				result.sign(result).then((sig) => resolve(sig)).catch(reject);
			});
		} else if (result instanceof x509.X509CertifiableKeyPair && result.keyType === 'EQC7') {
			signOff(factor, new Promise<import('crypto').Signer>((resolve), reject) => {
				result.sign(result).then((sig) => resolve(sig)).catch(reject);
			});
		} else if (result instanceof x509.X509CertifiableKeyPair && result.keyType === 'EQC8') {
			signOff
