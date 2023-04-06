
const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");
const btnRestart = document.getElementById('restart');
const questImg = document.getElementById("image_kras");

btnRestart.setAttribute("hidden", 'true');
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
		new Result("Вам многому нужно еще научиться", 0),
		new Result("Вы уже неплохо разбираетесь", 4),
		new Result("Ваш уровень выше среднего", 7),
		new Result("Вы в совершенстве знаете тему", 10)
	];

//Массив с вопросами
const questions =
	[
		new Question("Чем облицованы стены Исаакиевского собора?",
			[
				new Answer("Гранитом", 0),
				new Answer("Мрамором", 1),
				new Answer("Песчаником", 0),
				new Answer("Кварцитом", 0)
			]),

		new Question("Кому посвящена конная статуя Медный всадник, являющаяся одним из символов Санкт-Петербурга?",
			[
				new Answer("Александру Суворову", 0),
				new Answer("Петру I", 1),
				new Answer("Борису Годунову", 0),
				new Answer("Михаилу Кутузову", 0)
			]),

		new Question("Какая достопримечательность Санкт-Петербурга, одновременно являющаяся одним из его символов, расположена на Заячьем острове?",
			[
				new Answer("Петропавловская крепость", 1),
				new Answer("Адмиралтейство", 0),
				new Answer("Медный всадник", 0),
				new Answer("Соборная мечеть", 0)
			]),

		new Question("Какой мост в Санкт-Петербурге украшают четыре конных статуи?",
			[
				new Answer("Инженерный мост", 0),
				new Answer("Троицкий мост", 0),
				new Answer("Аничков мост", 1),
				new Answer("Литейный мост", 0)
			]),

		new Question("Какой из крупнейших музеев Санкт-Петербурга отмечает «День Кота», посвященный кошкам, живущим в нём?",
			[
				new Answer("Кунсткамера", 0),
				new Answer("Зоологический музей", 0),
				new Answer("Эрмитаж", 1),
				new Answer("Юсуповский дворец", 0)
			]),

		new Question("Памятник какой русской императрице расположен в садике перед Александринским театром?",
			[
				new Answer("Елизавете I", 0),
				new Answer("Екатерине I", 0),
				new Answer("Екатерине II", 1),
				new Answer("Анне Иоанновне", 0)
			]),
		new Question("Как называется самая главная река города?",
			[
				new Answer("Большая Невка", 0),
				new Answer("Фонтанка", 0),
				new Answer("Нева", 1),
				new Answer("Мойка", 0)
			]),
		new Question("Как называют колонны на Стрелке Васильевского острова?",
			[
				new Answer("Красные колонны", 0),
				new Answer("Ростральные колонны", 1),
				new Answer("Колонны Славы", 0),
				new Answer("Морейские колонны", 0)
			]),
		new Question("Какие существа украшают Банковский мост?",
			[
				new Answer("Сфинксы", 0),
				new Answer("Орлы", 0),
				new Answer("Грифоны", 1),
				new Answer("Кони", 0)
			]),
		new Question("Какова высота Адмиралтейского шпиля в городе Санкт-Петербурге?",
			[
				new Answer("72 метра", 1),
				new Answer("70 метров", 0),
				new Answer("75 метров", 0),
				new Answer("80 метров", 0)
			])
	];

//Сам тест
const quiz = new Quiz(1, questions, results);

Update();

//Обновление теста
function Update() {
	//Проверяем, есть ли ещё вопросы
	if (quiz.current < quiz.questions.length) {
		//Если есть, меняем вопрос в заголовке
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
		buttonsElem.innerHTML = "";
		if (quiz.score < 5) {
			questImg.src = "unsuccess.png";
		} else if (quiz.score > 4 && quiz.score < 8) {
			questImg.src = "not_bad.png";
		}
		else {
			questImg.src = "pushkin.png";
		}
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Заработанные очки: " + quiz.score;
		btnRestart.removeAttribute("hidden");
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
