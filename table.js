var script = document.createElement("SCRIPT");
script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js";
script.type = "text/javascript";
script.onload = function () {
  var $ = window.jQuery;
  // Use $ here...
};
document.getElementsByTagName("head")[0].appendChild(script);

var style = document.createElement("style");
style.type = "text/css";
style.innerHTML =
  "body{background-color: #eee} table, th, td { text-align: center; } table tr:nth-child(even){ background-color: #BEF2F5} .pagination li:hover{ cursor: pointer;}";

document.getElementsByTagName("head")[0].appendChild(style);

function htmlToElement(html) {
  var template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

function createElementFromHTML(htmlString) {
  var div = document.createElement("div");
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
}

function tableCreate() {
  var col = ["", "ลำดับ", "กลุ่ม", ""];
  var data = [
    { name: "กฏหมายระหว่างประเทศ" },
    { name: "กฏหมายของประเทศไทย" },
    { name: "กฏหมายของประเทศไทย" },
    { name: "กฏหมายของประเทศไทย" },
    { name: "กฏหมายของประเทศไทย" },
    { name: "กฏหมายของประเทศไทย" },
  ];

  var span = document.createElement("span");
  var svg = createElementFromHTML(
    '<span><svg id="Capa_1" enable-background="new 0 0 515.555 515.555" height="20px" viewBox="0 0 515.555 515.555" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="m303.347 18.875c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138c25.166-25.167 65.97-25.167 91.138 0"/><path d="m303.347 212.209c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138c25.166-25.167 65.97-25.167 91.138 0"/><path d="m303.347 405.541c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138c25.166-25.167 65.97-25.167 91.138 0"/></svg></span>'
  );

  var chkbox = createElementFromHTML(
    '<input type="checkbox" id="vehicle2" name="vehicle2" value="Car" style="height:20px; width:20px;">'
  );

  var body = document.getElementsByTagName("body")[0];

  var tbl = document.createElement("table");
  tbl.style.width = "100%";

  var tbh = document.createElement("thead");

  var tr1 = document.createElement("tr");
  for (var i = 0; i < col.length; i++) {
    var th = document.createElement("th");
    th.appendChild(document.createTextNode(col[i]));
    tr1.appendChild(th);
  }

  tbh.appendChild(tr1);

  var tbdy = document.createElement("tbody");
  for (var i = 0; i < data.length; i++) {
    var tr = document.createElement("tr");
    for (var j = 0; j < 4; j++) {
      var td = document.createElement("td");
      if (j === 1) {
        td.appendChild(document.createTextNode(i + 1));
      } else if (j === 2) {
        td.appendChild(document.createTextNode(data[i].name));
      } else if (j === 3) {
        td.appendChild(svg);
      } else {
        td.appendChild(chkbox);
      }
      tr.appendChild(td);
    }
    tbdy.appendChild(tr);
  }

  var paginationContainer = document.createElement("div");
  var paginationNav = document.createElement("nav");
  var paginationUl = document.createElement("ul");
  paginationUl.className = "pagination";
  var paginationLiPrev = document.createElement("li");
  paginationLiPrev.setAttribute("data-page", "prev");
  var paginationLiNext = document.createElement("li");
  paginationLiNext.setAttribute("id", "prev");
  paginationLiNext.setAttribute("data-page", "next");
  var prev = createElementFromHTML(
    '<span> < <span class="sr-only">(current)</span></span>'
  );
  var next = createElementFromHTML(
    '<span> > <span class="sr-only">(current)</span></span>'
  );

  var formGroup = document.createElement("div");
  formGroup.className = "form-group";
  var selector = document.createElement("select");
  selector.className = "form-control";
  selector.setAttribute("id", "maxRows");
  selector.setAttribute("name", "state");
  for (var i = 0; i < 8; i++) {
    var option = document.createElement("option");
    if (i === 0) {
      option.value = 5000;
      option.appendChild(document.createTextNode("Show All Rows"));
      selector.appendChild(option);
    } else {
      option.value = i * 5;
      option.appendChild(document.createTextNode(`${i * 5}`));
      selector.appendChild(option);
    }
  }
  formGroup.appendChild(selector);

  selector.addEventListener("change", getPagination);

  function getPagination() {
    var lastPage = 1;

    $("#maxRows")
      .on("change", function (evt) {
        //$('.paginationprev').html('');						// reset pagination

        lastPage = 1;
        $(".pagination").find("li").slice(1, -1).remove();
        var trnum = 0; // reset tr counter
        var maxRows = parseInt($(this).val()); // get Max Rows from select option

        if (maxRows == 5000) {
          $(".pagination").hide();
        } else {
          $(".pagination").show();
        }

        var totalRows = $("tbody tr").length;

        $("tr:gt(0)").each(function () {
          // each TR in  table and not the header
          trnum++; // Start Counter
          if (trnum > maxRows) {
            // if tr number gt maxRows

            $(this).hide(); // fade it out
          }
          if (trnum <= maxRows) {
            $(this).show();
          } // else fade in Important in case if it ..
        });

        if (totalRows > maxRows) {
          // if tr total rows gt max rows option
          var pagenum = Math.ceil(totalRows / maxRows); // ceil total(rows/maxrows) to get ..
          //	numbers of pages
          for (var i = 1; i <= pagenum; ) {
            // for each page append pagination li
            $(".pagination #prev")
              .before(
                '<li data-page="' +
                  i +
                  '"><span>' +
                  i++ +
                  '<span class="sr-only">(current)</span></span></li>'
              )
              .show();
          } // end for i
        }
        $('.pagination [data-page="1"]').addClass("active");

        $(".pagination li").on("click", function (evt) {
          // on click each page
          evt.stopImmediatePropagation();
          evt.preventDefault();
          var pageNum = $(this).attr("data-page"); // get it's number

          var maxRows = parseInt($("#maxRows").val()); // get Max Rows from select option

          if (pageNum == "prev") {
            if (lastPage == 1) {
              return;
            }
            pageNum = --lastPage;
          }
          if (pageNum == "next") {
            if (lastPage == $(".pagination li").length - 2) {
              return;
            }
            pageNum = ++lastPage;
          }

          lastPage = pageNum;
          var trIndex = 0; // reset tr counter
          $(".pagination li").removeClass("active"); // remove active class from all li
          $('.pagination [data-page="' + lastPage + '"]').addClass("active"); // add active class to the clicked
          // $(this).addClass('active');					// add active class to the clicked
          limitPagging();
          $("tr:gt(0)").each(function () {
            // each tr in table not the header
            trIndex++; // tr index counter
            // if tr index gt maxRows*pageNum or lt maxRows*pageNum-maxRows fade if out
            if (
              trIndex > maxRows * pageNum ||
              trIndex <= maxRows * pageNum - maxRows
            ) {
              $(this).hide();
            } else {
              $(this).show();
            } //else fade in
          }); // end of for each tr in table
        }); // end of on click pagination list
        limitPagging();
      })
      .val(5)
      .change();
  }

  function limitPagging() {
    // alert($('.pagination li').length)

    if ($(".pagination li").length > 7) {
      if ($(".pagination li.active").attr("data-page") <= 3) {
        $(".pagination li:gt(5)").hide();
        $(".pagination li:lt(5)").show();
        $('.pagination [data-page="next"]').show();
      }
      if ($(".pagination li.active").attr("data-page") > 3) {
        $(".pagination li:gt(0)").hide();
        $('.pagination [data-page="next"]').show();
        for (
          let i = parseInt($(".pagination li.active").attr("data-page")) - 2;
          i <= parseInt($(".pagination li.active").attr("data-page")) + 2;
          i++
        ) {
          $('.pagination [data-page="' + i + '"]').show();
        }
      }
    }
  }

  paginationLiNext.appendChild(next);
  paginationLiPrev.appendChild(prev);
  paginationUl.appendChild(paginationLiPrev);
  paginationUl.appendChild(paginationLiNext);
  paginationNav.appendChild(paginationUl);
  paginationContainer.appendChild(paginationNav);

  tbl.appendChild(tbh);
  tbl.appendChild(tbdy);
  body.appendChild(tbl);
  body.appendChild(paginationContainer);
  body.appendChild(formGroup);
}

tableCreate();
