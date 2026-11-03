export function generateId(): string {
  return crypto.randomUUID();
}

let codeCounter = 10001;

export function generateCode(): string {
  return `RT-${codeCounter++}`;
}
