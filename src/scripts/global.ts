// import 'bootstrap';
async function foo() {
  const value = await bar();
  console.log(value);
}

function bar() {
  return new Promise((resolve, reject) => {
    return resolve(4 * 1545);
  });
}

(async function run() {
  await foo()
}());