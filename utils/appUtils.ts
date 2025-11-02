import * as jose from 'jose';

export async function encryptRequest(data: object) {
  const publicKeyPem = process.env.NEXT_PUBLIC_REQUEST_PUBLIC_KEY!;
  const publicKey = await jose.importSPKI(publicKeyPem, 'RSA-OAEP-256');
  const encrypted = await new jose.CompactEncrypt(new TextEncoder().encode(JSON.stringify(data))).setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' }).encrypt(publicKey);

  return encrypted;
}

export async function decryptResponse(encrypted: string) {
  const privateKeyPem = process.env.NEXT_PUBLIC_RESPONSE_PRIVATE_KEY!;
  const privateKey = await jose.importPKCS8(privateKeyPem, 'RSA-OAEP-256');
  const { plaintext } = await jose.compactDecrypt(encrypted, privateKey);
  return JSON.parse(new TextDecoder().decode(plaintext));
}
