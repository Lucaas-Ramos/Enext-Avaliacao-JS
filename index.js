// Input inicial
class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}
let totalPrice = document.querySelector('#total')

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

//Teste de remoção usando reduce
  removeItem = (nome) => {

    this.items.splice(nome, 1);
    bill.render();

    let total = bill.items.reduce(getTotal, 0);

    function getTotal(total, item){
      return total + parseFloat(item.price);
    }
    totalPrice.innerHTML = 'R$ ' + '<span id="precoTotal">' + total + '</span>';
  }
    
//Soma dos itens na comanda
  billTotal = () => {
    var total = 0;
        for(var i= 0; i < this.items.length; i++ ){
        total += this.items[i].price;
      }
      document.getElementById('total').innerHTML = 'R$ ' + total;
    
  };
  
  render = () => {
    let billContainer = document.querySelector('#items');
    billContainer.innerHTML = '';

//Excluir da comanda ao clicar
    if(bill.items.length == 0){
      billEmpty();
    } else {
    this.items.map((item) => {
      let posicao = this.items.indexOf(item);
      let row = document.createElement("tr");
      let foodName = document.createElement("td");
      let foodPrice = document.createElement("td");
      foodName.onclick = function(){
        let response = confirm('Deseja excluir esse item da comanda?')
        if (response) {
          bill.removeItem(posicao);
          
        }
      }
      foodName.innerHTML = item.name;
      foodPrice.innerHTML = "R$ " + item.price;
      row.append(foodName);
      row.append(foodPrice);
      billContainer.append(row);
      })
    }
  }
}

// Mensagem quando a comanda estiver vazia
function billEmpty(){
  let elements = document.querySelector('#items');
      elements.innerHTML = '<h1 style="margin-left: 115px;">A comanda está vazia</h1>';
}

//Zerar a comanda quando estiver vazia
const bill = new Bill();

function init() {
  
  totalPrice.innerHTML = 'R$ 0.00';

  if(bill.items.length == 0){
    billEmpty();
  }
  document.getElementsByTagName('body')[0].style.display = 'flex';
}

// Adicionar itens da comanda
function adicionarItem(){
  let itemName = document.querySelector('#produto').value;
  let itemPrice = document.querySelector('#preco').value;
  if(itemName == '' || itemPrice == ''){
    alert("É necessário informar os itens a serem adicionados na comanda.");
  } else {
  itemPrice = parseFloat(itemPrice);
   bill.addItem(new Item(itemName, itemPrice));
   bill.billTotal();
   limparBill();
   bill.render();  
}
}

//Limpar campos de "Nome" e "Preço" quando adicionar um item
function limparBill(){
  let inputName = document.querySelector('#produto');
  let inputPrice = document.querySelector('#preco');

  inputName.value = '';
  inputPrice.value = '';
}

//Imprimir pedido da comanda
function printOk(){
  window.print();
  let totalPrice = document.querySelector('#total');
  bill.items.length = 0;
  bill.removeItem();
  totalPrice.innerHTML = 'R$ 0,00';
  limparBill();
}
function printBill() {
  if(bill.items.length == 0){
    let decisao = confirm("Deseja imprimir a comanda vazia?");
    if (decisao == true){
      printOk();
    } else {
      limparBill();
    }
  } else {
    printOk();
  }
}
