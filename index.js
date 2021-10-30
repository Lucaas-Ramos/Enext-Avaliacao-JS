class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

//Comanda da página

class Bill {
  constructor() {
    this.items = [];
    this.total = 0;
  }

  addItem = (item) => {
    this.items.push(item);
    this.render();
    this.billTotal();
  };

  removeItem = (nome) => {
    
  };

  billTotal = () => {
    var total = 0;
        for(var i= 0; i < this.items.length; i++ ){
        total += this.items[i].price;
      }
      document.getElementById('total').innerHTML = 'R$ ' + total;
    
  };
  

  render = () => {
    let billContainer = document.getElementById("items");
    billContainer.innerHTML = "";
    this.items.map((item) => {
      let row = document.createElement("tr");
      let foodName = document.createElement("td");
      let foodPrice = document.createElement("td");
      foodName.innerHTML = item.name;
      foodPrice.innerHTML = "R$ " + item.price;

      row.append(foodName);
      row.append(foodPrice);
      billContainer.append(row);
    });
  };
}
    
var bill = new Bill();

function init() {
  document.getElementsByTagName("body")[0].style.display = "flex";
}

//Remover itens da comanda ao clicar no nome
foodName.onclick = function(){
  let response = confirm('Tem certeza que deseja excluir esse item da comanda?')
  if (response) {
    bill.removeItem(foodName, foodPrice);
  }
}

function limparComanda(){
  let inputName = document.querySelector('#produto');
  let inputPrice = document.querySelector('#preco');

  inputName.value = '';
  inputPrice.value = '';
}

//Imprimir pedido
function printOk(){
  window.print();
  let totalPrice = document.querySelector('#total');
  bill.items.length = 0;
  bill.removeItem();
  totalPrice.innerHTML = 'R$ 0,00';
  limpar();
}
function printBill() {
  if(bill.items.length == 0){
    let decisao = confirm("Tem certeza que deseja imprimir a comanda vazia?");
    if (decisao == true){
      printOk();
    } else {
      limpar();
    }
  } else {
    printOk();
  }
}


function adicionarItem(){
  let itemName = document.querySelector('#produto').value;
  let itemPrice = document.querySelector('#preco').value;
  itemPrice = parseFloat(itemPrice);

   bill.addItem(new Item(itemName, itemPrice));
   bill.billTotal();
   limparComanda();
   bill.render();
}


