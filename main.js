// local storage (to make this app remember things & data)
let purchasedlist = JSON.parse(localStorage.getItem("purchasedList")) || {};
// App Ui
const container = document.querySelector(".appContainer");
document.body.style.backgroundColor = "dodgerblue";
document.body.style.margin = "2rem 2rem";
document.body.style.fontFamily = "serif";
document.body.style.color = "white"
container.style.display = "flex";
container.style.flexDirection = "column";
container.style.alignItems = "center";
container.style.display = "flex";
container.style.gap = "0.5rem";
container.style.textAlign = "center";
document.body.style.overflow = "hidden";
const appName = document.getElementById("NameApp");
appName.style.fontSize = "3rem"
const itemName = document.getElementById("itemName");
const itemPrice = document.getElementById("itemPrice");
itemName.style.padding = "0.5rem 1.5rem";
itemPrice.style.padding = "0.5rem 1.5rem";
itemName.style.borderRadius = "0.5rem";
itemPrice.style.borderRadius = "0.5rem";
itemName.style.border = "none";
itemPrice.style.border = "none";
itemName.style.color = "gray";
itemPrice.style.color = "gray";
itemName.style.outlineColor = "gray";
itemPrice.style.outlineColor = "gray";
const trackBtn = document.getElementById("track");
trackBtn.style.padding = "0.5rem 1.5rem";
trackBtn.style.borderRadius = "0.5rem";
trackBtn.style.border = "none";
trackBtn.style.color = "dodgerblue";
trackBtn.style.backgroundColor = "white";
const itemList = document.getElementById("Items");
itemList.style.listStyle = "none";
itemList.style.height = "240px";
itemList.style.width = "300px";
itemList.style.border = "none";
itemList.style.display = "flex";
itemList.style.flexDirection = "column";
itemList.style.textAlign = "end";
itemList.style.overflow = "scroll";
itemList.style.marginRight = "2.7rem";

//App Logic
const totalExp = document.getElementById("totalExp");
const totalIts = document.getElementById("totalIte");

function show_purchased() {
  itemList.innerHTML = "";
  totalExp.innerText = `Total Expense: $0`;
  let count = 0;
  let expense = 0;
  for (let key in purchasedlist) {
    count += 1;
    expense += Number(purchasedlist[key]);
    totalIts.innerText = `Items: ${count}`;
    totalExp.innerText = `Expense: $${expense}`;
    console.log(purchasedlist[key]);
    const item = document.createElement("li");
    item.style.padding = "0.5rem 0rem";
    item.style.display = "flex";
    item.style.justifyContent = "center";
    item.style.alignItems = "center";
    item.style.textAlign = "center"
    item.style.borderRadius = "0.5rem";
    item.style.border = "none";
    item.style.marginTop = "0.5rem";
    item.style.color = "dodgerblue";
    item.style.margin = "0.5rem 1rem"
    item.style.backgroundColor = "white";
    item.textContent = `${key[0].toUpperCase() + key.slice(1)} | $${purchasedlist[key]}`;
    item.style.fontSize = "0.7rem";
    itemList.appendChild(item);
    const delBtn = document.createElement("button");
    delBtn.style.padding = "0.3rem 0.5rem";
    delBtn.style.borderRadius = "0.5rem";
    delBtn.style.border = "none";
    delBtn.style.color = "white";
    delBtn.style.backgroundColor = "dodgerblue";
    delBtn.textContent = `Remove`;
    delBtn.style.border = "none";
    delBtn.style.marginLeft = "4.5rem";
    item.appendChild(delBtn);
    delBtn.addEventListener("click", () => {
      itemList.removeChild(item);
      delete purchasedlist[key];
      count -= 1;
      totalIts.innerText = `Items: ${count}`;
      expense -= Number(purchasedlist[key]);
      totalExp.innerText = `Expense: $${expense}`;
      localStorage.setItem("purchasedList", JSON.stringify(purchasedlist));
      show_purchased();
    });
    
  }
}
show_purchased();

trackBtn.addEventListener("click", () => {
  if (itemName.value === "" && itemPrice.value === "" || itemName.value === "" || itemPrice.value === "") {
    itemName.style.border = "2px solid red";
    itemPrice.style.border = "2px solid red";
  } else {
    itemName.style.border = "none";
    itemPrice.style.border = "none";
    purchasedlist[itemName.value] = itemPrice.value;
    localStorage.setItem("purchasedList", JSON.stringify(purchasedlist));
    show_purchased();
    itemName.value = "";
    itemPrice.value = "";
  }
});