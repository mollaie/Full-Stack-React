import * as bcrypt from 'bcrypt';

export const hash_password = async (password: string): Promise<string> => {
  return new Promise<string>(async (resolve, _) => {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    resolve(hash);
  });
};

export const compare_password = async (
  password,
  hashed_password,
): Promise<boolean> => {
  return new Promise<boolean>(async (resolve, _) => {
    const match = await bcrypt.compare(password, hashed_password);

    resolve(match);
  });
};
