$(() => {

  $(document).on('submit', 'form', function (e) {
    e.preventDefault();

    getUserAnswers();


  })
  let noOfQuestions;
  let userAnswers = [];
  const getUserAnswers = function () {
    const elements = document.getElementsByClassName("quiz-questions");
    console.log("elements", elements);
    for (let index = 1; index <= elements.length; index++) {
      const answerChoice = getRadioButtonValue(`Radio${index}`);
      console.log("***", answerChoice)

      const answer = document.getElementById(`questionChoice${answerChoice}-${index}`).innerText;
      console.log("answer", answer)
      userAnswers.push(answer);
      noOfQuestions = index;
    }
    console.log("final answers", userAnswers);

    let value = 100 / noOfQuestions;
    //getting the id from the url so that we can pass it to the backend
    const id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    console.log("id***", id)
    $.ajax({
      type: "POST",
      url: `/quizzes/${id}`,
      data: { userAnswers, value, id },

      success: (data) => {
        console.log("userajax", data);
        window.location.href = `/results/${data.userId}/most_recent`;
      },
      catch: (e) => {
        alert(e);
      }
    });


  }


  function getRadioButtonValue(selector) {

    const ele = document.getElementsByName(selector);
    console.log("ele", ele)
    for (i = 0; i < ele.length; i++) {
      console.log("radio", ele[i])
      if (ele[i].checked) {

        return ele[i].value;
      }
    }
  }


})
