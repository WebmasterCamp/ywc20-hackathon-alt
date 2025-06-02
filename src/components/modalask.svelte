<script lang="ts">
    let currentQuestion = $state(0);
    let userAnswers: { value: string; text: string }[] = $state([]);
    let showResults = $state(false);
    let isOpen = $state(true);
  interface Props {
    resetQuiz: () => void;
  }

  
  function resetQuiz(){
    currentQuestion = 0;
    userAnswers = [];
    showResults = false;
  }

  function closeModal(){
    isOpen = false;
  }



    const questions = [
      {
        question: "คุณมีสถานที่ดูดาวเฉพาะที่อยากไปอยู่แล้วหรือไม่?",
        answers: [
          { value: "yes", text: "มี" },
          { value: "no", text: "ไม่มี" }
        ]
      },
      {
        question: "สไตล์การเที่ยวของคุณเป็นแบบไหน",
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

</script>
  
{#if isOpen}
  <!-- Modal Backdrop -->
  <div class="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center p-4 z-50">
    <!-- Modal Container -->
    <div class="relative w-full max-w-2xl mx-auto">
      <!-- Close Button -->


      {#if !showResults}
        <!-- Question Card -->
        <div class="bg-white rounded-[20px] p-8 shadow-2xl">
          <h2 class="text-3xl font-bold mb-4 font-['Noto_Sans_Thai'] text-center">
            แบบสอบถามความสนใจด้านการดูดาว <br>
            คำถามที่ {currentQuestion + 1} จาก {questions.length}
          </h2>
          <div class="my-[26px]">
          <p class="text-2xl font-medium text-gray-700 my-[26px] font-['Noto_Sans_Thai'] text-center">
            {questions[currentQuestion].question}
          </p>
          
          <!-- Answers Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            {#each questions[currentQuestion].answers as answer}
              <button 
                class="p-4 bg-blue-500 hover:bg-blue-600 text-white text-xl font-bold rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-lg font-['Noto_Sans_Thai']"
                onclick={() => handleAnswer(answer)}
                type="button"
              >
                {answer.text}
              </button>
            {/each}
          </div></div>
          <div class="grid grid-cols-1 mt-4">
            <button class="mx-auto text-center items-center justify-center hover:underline" onclick={closeModal}>ข้าม</button>
          </div>
          
        </div>
      {:else}
        <!-- Results Card -->
        <div class="bg-white rounded-3xl p-8 shadow-2xl text-left">
          <h2 class="text-3xl font-bold mb-6 font-['Noto_Sans_Thai']">ผลการตอบคำถาม</h2>
          
          <div class="space-y-6">
            {#each questions as question, index}
              <div class="p-4 border-b border-gray-200 last:border-b-0">
                <p class="text-xl font-medium mb-2 font-['Noto_Sans_Thai']">
                  <strong>คำถามที่ {index + 1}:</strong> {question.question}
                </p>
                <p class="text-xl font-medium text-blue-600 font-['Noto_Sans_Thai']">
                  <strong>คำตอบ:</strong> {userAnswers[index]?.text}
                </p>
              </div>
            {/each}
          </div>
          <div class="grid grid-cols-1 ">

          <button 
            class=" px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-xl font-bold rounded-xl transition-colors duration-300 font-['Noto_Sans_Thai']" 
            onclick={closeModal} 
            type="button"
          >
            ไปดูดาวกัน
          </button>
          <button class="mx-auto text-center items-center justify-center hover:underline mt-4" onclick={resetQuiz}>เริ่มใหม่อีกครั้ง</button>

          </div>
        </div>
      {/if}
    </div>
  </div>

{/if}
