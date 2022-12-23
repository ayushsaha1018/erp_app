import faker from "@faker-js/faker";
import fs from "fs";
import path from "path";

interface Args {
  fileName: string;
  sampleSize: number;
}

// parseSomeArgs
const getArgs = () => {
  const args: Args = {
    fileName: "data",
    sampleSize: 100
  };

  for (const arg of process.argv) {
    if (arg.startsWith("--file=")) {
      args.fileName = arg.split("=")[1];
    }

    if (arg.startsWith("--sample=")) {
      args.sampleSize = Number(arg.split("=")[1]);
    }
  }

  return args;
};

const args = getArgs();

const createCSVfile = (fileName: string) => {
  const filePath = path.join(__dirname, fileName);
  const writeStream = fs.createWriteStream(filePath);

  writeStream.write("firstName,lastName,email,password,role\n");

  for (let i = 0; i < args.sampleSize; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const role = Math.random() > 0.8 ? "teacher" : "student";

    writeStream.write(
      `${firstName},${lastName},${email},${password},${role}\n`
    );
  }

  writeStream.end();

  console.log("File created successfully!");
  console.log(`File at: ${filePath}`);
};

createCSVfile(`${args.fileName}.csv`);
