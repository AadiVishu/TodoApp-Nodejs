  //for updating the quotes page:
  $(document).ready(function(){
    $('.updateQuotes').click(function(){
      let quotesId = $(this).closest("a").attr("href");
      let quotesTitle = $(this).siblings("lable").text();
      let quotesSignature = $(this).closest("div").find('.quoteSignature').text();
      let quotesContent = $(this).closest("div").find('.quoteContent').text();
      //alert("quotesId : " + quotesId );
      let form = $(document).find('#updateMyquotes');
      form.find("[name='id']").val(quotesId);
      form.find("[name='quoteTitle']").val(quotesTitle);
      form.find("[name='quoteSignature']").val(quotesSignature);
      form.find("[name='quoteContent']").val(quotesContent);
    });
});


//for updating the projects:
$(document).ready(function(){
  $('.updateProjects').click(function(){
    let projectId = $(this).closest("a").attr("href");
    let projectTitle = $(this).siblings("h5").text();
    let projectContent = $(this).parents(".projectDiv").find('.projectContent').text();
    let form = $(document).find("#updateMyprojects");
    form.find("[name=id]").val(projectId);
    form.find("[name=projectTitle]").val(projectTitle);
    form.find("[name=projectContent]").val(projectContent);

  })
});


// for done task:
// $(document).ready(function(){
//   $('.doneTask').click(function(){
//     let doneTaskContent = $(this).closest('.doneTask').closest('.todoListBody').find('.doneTaskContent').text();
//     // alert(doneTaskContent);
//     $('.doneTaskContent').replaceWith("<b><del>" + doneTaskContent + "</del></b>")
//   })
// })

// success info jQuery:
$(window).on('load',function(){
  $('#hideInfo').delay(2000).fadeOut();
});


