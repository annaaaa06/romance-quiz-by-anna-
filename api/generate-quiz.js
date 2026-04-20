async function generateQuiz() {
  const theme = document.getElementById("bookSelect").value;

  try {
    const res = await fetch("/api/generate-quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ theme })
    });

    const data = await res.json();

    if (!data.quiz) {
      alert("Erreur IA : aucun quiz reçu");
      return;
    }

    quizzes = data.quiz;
    current = 0;
    score = 0;

    loadQuestion();

  } catch (err) {
    console.error(err);
    alert("Erreur serveur IA");
  }
}
