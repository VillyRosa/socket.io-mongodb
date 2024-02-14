import { randomBytes, scryptSync } from 'crypto';

function criaHashESalSenha(senhaDigitada) {
  const salSenha = randomBytes(16).toString('hex');

  const hashSenha = scryptSync(senhaDigitada, salSenha, 64).toString('hex');

  return { hashSenha, salSenha };
}

export default criaHashESalSenha;