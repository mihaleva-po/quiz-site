const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");
const btnRestart = document.getElementById('restart');
const questImg = document.getElementById("image");
const classImg = document.getElementById("class_image");
const header = document.getElementById("header");


btnRestart.setAttribute("hidden", 'true');
// headElem.setAttribute("hidden", 'true');
//Класс, который представляет сам тест
class Quiz {
	constructor(type, questions, results) {
		//Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
		this.type = type;

		//Массив с вопросами
		this.questions = questions;

		//Массив с возможными результатами
		this.results = results;

		//Количество набранных очков
		this.score = 0;

		//Номер результата из массива
		this.result = 0;

		//Номер текущего вопроса
		this.current = 0;
	}

	Click(index) {
		//Добавляем очки
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;

		//Если было добавлено хотя одно очко, то считаем, что ответ верный
		if (value >= 1) {
			correct = index;
		}
		else {
			//Иначе ищем, какой ответ может быть правильным
			for (let i = 0; i < this.questions[this.current].answers.length; i++) {
				if (this.questions[this.current].answers[i].value >= 1) {
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}

	//Переход к следующему вопросу
	Next() {
		this.current++;

		if (this.current >= this.questions.length) {
			this.End();
		}
	}

	//Если вопросы кончились, этот метод проверит, какой результат получил пользователь
	End() {
		for (let i = 0; i < this.results.length; i++) {
			if (this.results[i].Check(this.score)) {
				this.result = i;
			}
		}
	}
}

//Класс, представляющий вопрос
class Question {
	constructor(text, answers) {
		this.text = text;
		this.answers = answers;
	}

	Click(index) {
		return this.answers[index].value;
	}
}

//Класс, представляющий ответ
class Answer {
	constructor(text, value) {
		this.text = text;
		this.value = value;
	}
}

//Класс, представляющий результат
class Result {
	constructor(text, value) {
		this.text = text;
		this.value = value;
	}

	//Этот метод проверяет, достаточно ли очков набрал пользователь
	Check(value) {
		if (this.value <= value) {
			return true;
		}
		else {
			return false;
		}
	}
}

//Массив с результатами
const results =
	[
		new Result("Вам многому нужно научиться", 0),
		new Result("Вы уже неплохо разбираетесь", 4),
		new Result("Ваш уровень выше среднего", 7),
		new Result("Вы в совершенстве знаете тему", 10)
	];

//Массив с вопросами
const questions =
	[
		new Question("",
			[
				new Answer("Исаакиевский собор", 1),
				new Answer("Храм Воскресения Христова", 0),
				new Answer("Казанский собор", 0),
				new Answer("Николаевский дворец", 0)
			]),

		new Question("",
			[
				new Answer("Заячий остров", 0),
				new Answer("Невский проспект", 0),
				new Answer("Стрелка Васильевского острова", 1),
				new Answer("Нахимовское военно-морское училище", 0)
			]),

		new Question("",
			[
				new Answer("Петергоф", 0),
				new Answer("Летний сад", 1),
				new Answer("Юсуповский сад", 0),
				new Answer("Ботанический сад", 0)
			]),

		new Question("",
			[
				new Answer("Зимний дворец", 1),
				new Answer("Юсуповский дворец", 0),
				new Answer("Чесменский дворец", 0),
				new Answer("Михайловский дворец", 0)
			]),

		new Question("",
			[
				new Answer("Таврический дворец", 0),
				new Answer("Екатерининский дворец", 1),
				new Answer("Эрмитаж", 0),
				new Answer("Большой Петергофский дворец", 0)
			]),

		new Question("",
			[
				new Answer("Дмитриевский собор", 0),
				new Answer("Смольный собор", 0),
				new Answer("Троице-Измайловский собор", 1),
				new Answer("Чесменская церковь", 0)
			]),
		new Question("",
			[
				new Answer("Крепость Орешек", 0),
				new Answer("Кроншлот", 0),
				new Answer("Адмиралтейство", 0),
				new Answer("Петропавловская крепость", 1)
			]),
		new Question("",
			[
				new Answer("Дом Зингера", 1),
				new Answer("Дом Коллана", 0),
				new Answer("Магазин купцов Елисеевых", 0),
				new Answer("Особняк Чаева", 0)
			]),
		new Question("",
			[
				new Answer("Зимний сад", 0),
				new Answer("Летний сад", 0),
				new Answer("Петергофский сад", 1),
				new Answer("Гатчинский сад", 0)
			]),
		new Question("",
			[
				new Answer("Базилика Святой Екатерины", 0),
				new Answer("Архангельский собор", 0),
				new Answer("Собор Святой Софии", 0),
				new Answer("Александро-Невская лавра", 1)
			])
	];

//Сам тест
const quiz = new Quiz(1, questions, results);
const images =
[
'исаакиевский.jpeg',
'стрелка.jpg',
'летний_сад.jpg',
'зимний_дворец.jpg',
'екатерининский.jpg',
'троицкий.jpg',
'петропавловка.jpg',
'зингер.jpg',
'петергоф.jpg',
'лавра.jfif'
];
Update();
//Обновление теста
function Update() {
	//Проверяем, есть ли ещё вопросы
	if (quiz.current < quiz.questions.length) {
		//Если есть, меняем вопрос в заголовке
		questImg.border = 5;
		// questImg.src = "стрелка.jpg";
		questImg.src = images[quiz.current];
		headElem.innerHTML = quiz.questions[quiz.current].text;

		//Удаляем старые варианты ответов
		buttonsElem.innerHTML = "";

		//Создаём кнопки для новых вариантов ответов
		for (let i = 0; i < quiz.questions[quiz.current].answers.length; i++) {
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}

		//Выводим номер текущего вопроса
		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		//Вызываем функцию, которая прикрепит события к новым кнопкам
		Init();
	}
	else {
		//Если это конец, то выводим результат
		buttonsElem.innerHTML = "";
		if (quiz.score<5){
			questImg.src = "unsuccess.png";
		} else if (quiz.score>4 && quiz.score<8) {
			questImg.src = "not_bad.png";
		}
		else {
			questImg.src = "pushkin.png";
		}
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Заработанные очки: " + quiz.score;
		btnRestart.removeAttribute("hidden");
		header.setAttribute("hidden", 'true');
		questImg.border = 0;
		classImg.height = 200;
	}
}

function Init() {
	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	for (let i = 0; i < btns.length; i++) {
		//Прикрепляем событие для каждой отдельной кнопки
		//При нажатии на кнопку будет вызываться функция Click()
		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) {
	//Получаем номер правильного ответа
	let correct = quiz.Click(index);

	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	//Делаем кнопки серыми
	for (let i = 0; i < btns.length; i++) {
		btns[i].className = "button button_passive";
	}

	//Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
	if (quiz.type == 1) {
		if (correct >= 0) {
			btns[correct].className = "button button_correct";
		}

		if (index != correct) {
			btns[index].className = "button button_wrong";
		}
	}
	else {
		//Иначе просто подсвечиваем зелёным ответ пользователя
		btns[index].className = "button button_correct";
	}

	//Ждём секунду и обновляем тест
	setTimeout(Update, 1000);
}