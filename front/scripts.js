console.log("test");
document.querySelector("#content").innerHTML = "<p>test</p>";
let interval;

const clientCode = Date.now();

const start = async (isfirstTime) => {
  const url = document.querySelector("#search-input").value;
  if (interval) {
    stop();
  }

  const randomTime = Date.now();

  fetch(`http://localhost:3000?${randomTime}=${randomTime}`, {
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
        console.log(data);
        if (!data.isNotNeeded) {
          setData(data.cars.filter);
        }
        await setTimeout(1000);
        start(false);
      },
      async (error) => {
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
  clearInterval(interval);
};
