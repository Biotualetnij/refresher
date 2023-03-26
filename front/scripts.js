console.log("test");
let isBreak = false;
let interval;

const clientCode = Date.now();
let isworking = false;
const start = async (isfirstTime) => {
  const url = document.querySelector("#search-input").value;

  if (isworking && isfirstTime) {
    alert("please stop last search");
    return;
  }
  isworking = true;
  if (isBreak && isfirstTime) {
    alert("please wait 5 seconds to stop last search");
    return;
  }
  const randomTime = Date.now();

  fetch(`http://75.119.135.27:3000?${randomTime}=${randomTime}`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({ url: url, firstTime: isfirstTime, clientCode }),
  })
    .then((response) => response.json())
    .then(
      async (data) => {
        if (isBreak) {
          isBreak = false;
          throw new Error("stop");
        }
        console.log(data);
        if (!data.isNotNeeded) {
          setData(data.cars.filter);
        }
        await setTimeout(1000);
        start(false);
      },
      async (error) => {
        if (isBreak) {
          isBreak = false;
          throw new Error("stop");
        }
        console.log(error);
        await setTimeout(1000);
        start(false);
      }
    );
};
setData = (data) => {
  console.log(data[0]);
  let container = document.querySelector("#content");
  container.innerHTML = "";
  data.forEach((element) => {
    const node = document.createElement("li");
    node.innerHTML = `
    <a href="${element.link}"><img src="${element.img}"></a>
    <a href="${element.link}"><div> title:${element.title}</div> </a>
    <div> name:${element.name}</div>
    <div> price:${element.price}</div>
    <div> date when it start to exist on website:${new Date(
      element.date
    ).toISOString()}</div>
   `;
    container.appendChild(node);
  });
};
const stop = () => {
  isBreak = true;
  isworking = false;
  alert("please wait 5 seconds to stop last search");

  setTimeout(() => {
    isBreak = false;
  }, 5000);
};
