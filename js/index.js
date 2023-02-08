// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

const minWeightInputField = document.querySelector('.minweight__input');  
const maxWeightInputField = document.querySelector('.maxweight__input');  

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits

    while (fruitsList.firstChild) {
      fruitsList.removeChild(fruitsList.lastChild);
    }
  
  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
        const li = document.createElement('li');
        const div = document.createElement('div');
        const div2 = document.createElement("div");
        const div3 = document.createElement("div");
        const div4 = document.createElement("div");
        if (fruits[i].color ==  "фиолетовый") {
           li.className ='fruit__item fruit_violet';
        } else if (fruits[i].color ==  "зеленый") {
          li.className ='fruit__item fruit_green';
        } else if (fruits[i].color ==  "розово-красный") {
          li.className ='fruit__item fruit_carmazin';
        }  else if (fruits[i].color ==  "желтый") {
          li.className ='fruit__item fruit_yellow';
        } else if (fruits[i].color ==  "светло-коричневый") {
          li.className ='fruit__item fruit_lightbrown';
        } else if (fruits[i].color ==  "красный") {
          li.className ='fruit__item fruit_red'; //
        } else if (fruits[i].color ==  "оранжевый") {
          li.className ='fruit__item fruit_orange'; //
        } else if (fruits[i].color ==  "коричневый") {
          li.className ='fruit__item fruit_brown'; //
        } else if (fruits[i].color ==  "голубой") {
          li.className ='fruit__item fruit_blue'; //
        } else li.className ='fruit__item fruit_lightblack';
        div.className ='fruit__info';
        const textNodeIndex = document.createTextNode("index: " + i);
        const textNodeKind = document.createTextNode("kind: " + fruits[i].kind);
        const textNodeColor = document.createTextNode("color: " + fruits[i].color);
        const textNodeWeigh = document.createTextNode("weight: " + fruits[i].weight);
        div.appendChild(textNodeIndex);
        div.appendChild(div2);
        div.appendChild(textNodeKind);
        div.appendChild(div3);
        div.appendChild(textNodeColor);
        div.appendChild(div4);
        div.appendChild(textNodeWeigh);
       // div.innerHTML= "index: " + i + "<br>" + "kind: " + fruits[i].kind + "<br>" + "color: " + fruits[i].color + "<br>" + "weight: " + fruits[i].weight;
        fruitsList.appendChild(li).appendChild(div);
  }
 
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  while (fruits.length > 0) {
    let fruitsRnd = getRandomInt(0,fruits.length-1);
    let fruitsArr = fruits.splice(fruitsRnd,1)[0];
    result.push(fruitsArr);
  

  }

      console.log(result);
  const resultJSON =  JSON.stringify(result);
  const FruitsJSON =  JSON.stringify(fruitsJSON);

if (resultJSON === FruitsJSON) {
  alert ("При перемешивании карточек содержание карточек ничего не изменилось. Повторите процедуру");
}
  
  fruits = result;
};

shuffleButton.addEventListener('click', () => {
  
  shuffleFruits();
  display();
 
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  let filteredOut=fruits.filter(item => {
    // TODO: допишите функцию
    let minWeight=(minWeightInputField.value>=0) ?minWeightInputField.value:0;
    let maxWeight=(maxWeightInputField.value>=0 && maxWeightInputField.value>minWeight)?maxWeightInputField.value:Infinity; 
    console.log(minWeight, maxWeight);
    return maxWeight>item.weight && item.weight>minWeight;

  })
  .map(item => item);
  console.log(filteredOut);
  return filteredOut;
};


filterButton.addEventListener('click', () => {
  fruits = filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // функцию сравнения двух элементов по цвету
  const  colorSpectrum = ["красный", "розово-красный", "оранжевый", "коричневый", "светло-коричневый", "желтый", "зеленый", "голубой", "фиолетовый"];
  return colorSpectrum.indexOf(a.color) < colorSpectrum.indexOf(b.color) ? true : false;
};

const sortAPI = {
  
  quickSort(arr, comparation){
      //  функция быстрой сортировки
      function myQuickSort (arr, comparation) {
        if (arr.length <= 1) {
          return arr;
        }
        const pivot = arr[Math.floor(Math.random() * arr.length)];
        console.log(pivot);
        let left = [];
        let right = [];
        let equal = [];
      
        for (let val of arr) {
          if (comparation(val,pivot)) {
            equal.push(val);
          } else if (!comparation(pivot,val)) {
            right.push(val);
          } else {
            left.push(val);
          }
        }
  fruits = [...myQuickSort(left, comparation), ...equal, ...myQuickSort(right, comparation)];
  return fruits;
        }
    myQuickSort(arr, comparation);
  },

  bubbleSort(arr, comparation) {
    //  функция сортировки пузырьком
    const n = arr.length;
    for (let i = 0; i < n-1; i++) { 
        for (let j = 0; j < n-1-i; j++) { 
            if (comparation(arr[j], arr[j+1])) { 
                let temp = arr[j+1]; 
                arr[j+1] = arr[j]; 
                arr[j] = temp; 
            }
        }
    } 
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
       setTimeout(end, 10000);
    sortTime = `${end - start} ms`;
    console.log(start-end);
    sortTimeLabel.textContent = sortTime;
  }
};





// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  if (sortKind == 'bubbleSort') {
     sortKind = 'quickSort';
  sortKindLabel.textContent = sortKind;
  } else {
    sortKind = 'bubbleSort';
    sortKindLabel.textContent = sortKind;
 
  }
 
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  // function TimeLabel() {
  // sortTimeLabel.textContent = 'sorting...';
  // }
  // setTimeout(TimeLabel, 1000);
  sortTimeLabel.textContent = 'sorting...';

  const sort = sortAPI[sortKind];
  
  console.log(sort);
 sortAPI.startSort(sort, fruits, comparationColor);
//  console.log(fruits);
 display();
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  if (kindInput.value != '' && colorInput.value != '' && weightInput.value != '') {
let obj = {};
obj["kind"] = kindInput.value;
obj["color"] = colorInput.value;
obj["weight"] = weightInput.value;
fruits.push(obj);
  display();
  } else {
    if(kindInput.value === ''){kindInput.style.border='3px solid red'; setTimeout(()=>{kindInput.style.border='';}, 5000);}
    if(colorInput.value === ''){colorInput.style.border='3px solid red'; setTimeout(()=>{colorInput.style.border='';}, 5000);}
    if(weightInput.value === ''){weightInput.style.border='3px solid red'; setTimeout(()=>{weightInput.style.border='';}, 5000);}
alert('Заполните все поля');
  }
});