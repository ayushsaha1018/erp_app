// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mongoTransform = (_doc: any, ret: any) => {
  const id = ret._id;
  delete ret._id;
  delete ret.__v;

  if (ret.password) {
    delete ret.password;
    delete ret.salt;
  }

  return {
    id,
    ...ret
  };
};
