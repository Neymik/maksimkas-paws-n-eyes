
import cp from 'child_process';

const Funcs = {};

Funcs.hello = () => {
  return 'hi'
};

Funcs.execAsync = async (command, options = { log: false, cwd: process.cwd() }) => {
  if (options.log) {
    console.log(command)
  }

  return new Promise((resolve, reject) => {
    cp.exec(command, { ...options }, (err, stdout, stderr) => {
      if (err) {
        err.stdout = stdout
        err.stderr = stderr
        reject(err)
        return
      }

      resolve(stdout)
    })
  })
}

Funcs.execute = async (command) => {
  return await Funcs.execAsync(command, { log: true});
}

export default Funcs;
