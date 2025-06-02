<script lang="ts">
    let currentQuestion = 0;
    let userAnswers: { value: string; text: string }[] = [];
    let showResults = false;
    let isOpen = true;
  
    const questions = [
      {
        question: "คุณมีสถานที่ดูดาวเฉพาะที่อยากไปอยู่แล้วหรือไม่?",
        answers: [
          { value: "yes", text: "มี" },
          { value: "no", text: "ไม่มี" }
        ]
      },
      {
        question: "2.สไตล์การเที่ยวของคุณเป็นแบบไหน",
        answers: [
          { value: "adventure", text: "สายลุย เน้นกิจกรรม" },
          { value: "chill", text: "สายชิล เน้นสะดวกสบาย" },
          { value: "", text: "ไม่มีสไตล์ชัดเจน" },
        ]
      },
      {
        question: "คุณต้องการดูดาวในช่วงเวลาใด?",
        answers: [
          { value: "morning", text: "เช้า" },
          { value: "afternoon", text: "บ่าย" },
          { value: "evening", text: "เย็น" },
          { value: "night", text: "กลางคืน" }
        ]
      },
      {
        question: "คุณต้องการดูดาวในฤดูใด?",
        answers: [
          { value: "summer", text: "ร้อน" },
          { value: "rainy", text: "ฝน" },
          { value: "winter", text: "หนาว" }
        ]
      }
    ];
  
    function handleAnswer(answer: { value: string; text: string }) {
      userAnswers = [...userAnswers, answer];
  
      if (currentQuestion < questions.length - 1) {
        currentQuestion++;
      } else {
        showResults = true;
      }
    }
  
    function resetQuiz() {
      currentQuestion = 0;
      userAnswers = [];
      showResults = false;
    }

    function closeModal() {
        isOpen = false;
    }
  </script>
  
  {#if isOpen}
    <div class="quiz-container">
      <div class="close-button" on:click={closeModal}>×</div>
      {#if !showResults}
        <div class="question-card">
          <h2 class="text-3xl font-bold font-['Noto_Sans_Thai'] mb-4">คำถามที่ {currentQuestion + 1} จาก {questions.length}</h2>
          <p class="question text-2xl font-medium font-['Noto_Sans_Thai']">{questions[currentQuestion].question}</p>
          
          <div class="answers-grid">
            {#each questions[currentQuestion].answers as answer}
              <button 
                class="answer-button"
                on:click={() => handleAnswer(answer)}
                type="button"
              >
                {answer.text}
              </button>
            {/each}
          </div>
        </div>
      {:else}
        <div class="results-card">
          <h2 class="text-3xl font-bold font-['Noto_Sans_Thai'] mb-6">ผลการตอบคำถาม</h2>
          {#each questions as question, index}
            <div class="answer-result">
              <p class="text-xl font-medium font-['Noto_Sans_Thai']"><strong>คำถามที่ {index + 1}:</strong> {question.question}</p>
              <p class="text-xl font-medium font-['Noto_Sans_Thai']"><strong>คำตอบ:</strong> {userAnswers[index]?.text}</p>
            </div>
          {/each}
          <button class="reset-button" on:click={resetQuiz} type="button">เริ่มต้นใหม่</button>
        </div>
      {/if}
    </div>
  {/if}
  
  <style>
    .quiz-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 2rem;
      position: relative;
    }
  
    .close-button {
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: #ef4444;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      cursor: pointer;
      transition: background-color 0.3s ease;
      z-index: 10;
    }
  
    .close-button:hover {
      background: #dc2626;
    }
  
    .question-card {
      background: white;
      border-radius: 20px;
      padding: 2rem;
      box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
    }
  
    .question {
      margin: 1.5rem 0;
      color: #333;
    }
  
    .answers-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      margin-top: 2rem;
    }
  
    .answer-button {
      padding: 1rem;
      border: none;
      border-radius: 10px;
      background: #3b82f6;
      color: white;
      font-size: 1.25rem;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: 'Noto Sans Thai', sans-serif;
    }
  
    .answer-button:hover {
      background: #2563eb;
      transform: translateY(-2px);
    }
  
    .results-card {
      text-align: left;
      background: white;
      border-radius: 20px;
      padding: 2rem;
      box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
    }
  
    .answer-result {
      margin: 1.5rem 0;
      padding: 1rem;
      border-bottom: 1px solid #e2e8f0;
    }
  
    .answer-result:last-child {
      border-bottom: none;
    }
  
    .reset-button {
      margin-top: 1rem;
      padding: 0.75rem 1.5rem;
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 1.25rem;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.3s ease;
      font-family: 'Noto Sans Thai', sans-serif;
    }
  
    .reset-button:hover {
      background: #2563eb;
    }
  </style>