const templates = [
  {
    question: (param) => `Qual base nitrogenada corresponde a ${param}?`,
    answer: (param) => param.toLowerCase(),
    params: ["adenina", "timina", "guanina", "citosina", "uracila"]
  },
  {
    question: (param) => `Qual é o ácido nucleico ${param}?`,
    answer: (param) => param.toLowerCase(),
    params: ["DNA", "RNA"]
  },
  {
    question: () => `O que significa a sigla DNA?`,
    answer: () => "ácido desoxirribonucleico",
    params: []
  },
  {
    question: () => `O que significa a sigla RNA?`,
    answer: () => "ácido ribonucleico",
    params: []
  },
  {
    question: (param) => `Qual o processo que reduz o número de cromossomos pela metade? (${param})`,
    answer: () => "meiose",
    params: ["dica: começa com M"]
  },
  {
    question: (param) => `Qual base nitrogenada substitui a timina no RNA? (${param})`,
    answer: () => "uracila",
    params: ["dica: começa com U"]
  }
];

let points = 0;
let coins = 0;
let currentQuestion = null;

function getRandomTemplate() {
  return templates[Math.floor(Math.random() * templates.length)];
}

function generateQuestion() {
  const template = getRandomTemplate();
  if (template.params.length > 0) {
    const param = template.params[Math.floor(Math.random() * template.params.length)];
    return {
      question: template.question(param),
      answer: template.answer(param)
    };
  } else {
    return {
      question: template.question(),
      answer: template.answer()
    };
  }
}

function showQuestion() {
  currentQuestion = generateQuestion();
  document.getElementById("question").innerText = currentQuestion.question;
  document.getElementById("answerInput").value = "";
  document.getElementById("feedback").innerText = "";
}

function checkAnswer() {
  const userAnswer = document.getElementById("answerInput").value.trim().toLowerCase();
  if (!userAnswer) {
    alert("Por favor, digite uma resposta.");
    return;
  }

  if (userAnswer === currentQuestion.answer.toLowerCase()) {
    points += 10;
    coins += 1;
    document.getElementById("feedback").innerText = "Resposta correta! +10 pontos e +1 moeda 🎉";
  } else {
    document.getElementById("feedback").innerText = `Resposta errada! Resposta correta: ${currentQuestion.answer}`;
  }

  document.getElementById("points").innerText = points;
  document.getElementById("coins").innerText = coins;

  setTimeout(showQuestion, 2000);
}

document.getElementById("btnSubmit").addEventListener("click", checkAnswer);

// Começa o quiz
showQuestion();
