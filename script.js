function genRandomBadgeCombo() {
    let badge_list = [
      {
        'name':'Work',
        'color':'greens'
      },
      {
        'name':'Documents',
        'color':'red'
      },
      {
        'name':'Social',
        'color':'social'
      },
      {
        'name':'Adv',
        'color':'cyan'
      },
      {
        'name':'Clients',
        'color':'yellow'
      }
    ];
    return badge_list[Math.floor(Math.random()*badge_list.length)];
  }
  function send() {
    let to=document.getElementById("to").value;
    console.log(to);
    let subject=document.getElementById("subject").value;
    console.log(subject);
    let email=document.getElementById("email").value;
    console.log(email);
    let email_list=localStorage.getItem("email_list");
    if (email_list) {
      try {
        email_list = JSON.parse(email_list);
      } catch (e) {
        email_list = [];
      }
    } else {
      email_list = [];
    }
    if (to && email) {
      email_list.unshift({"to":to,"subject":subject,"email":email,"badge":genRandomBadgeCombo(),"timestamp":new Date().getTime()});
    }
    localStorage.setItem("email_list",JSON.stringify(email_list));
  }
  function isToday(someDate) {
    let today = new Date();
    return someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear();
  }
  function genEmailRow(data) {
    let email_date = new Date(data.timestamp || 0);
    let email_date_moment = moment(email_date);
    let today_email = isToday(email_date);
    let email_row_html = '<tr class="';
    if (today_email) {
      email_row_html += 'table-secondary new">';
    } else {
      email_row_html += '">';
    }
    email_row_html += '<th scope="row"><div class="d-flex"><input class="form-check-input chckbox" type="checkbox" value=""id="flexCheckDefault"><span class="';
    if (today_email) {
      email_row_html += 'name new">';
    } else {
      email_row_html += 'name">';
    }
    email_row_html += data.to;
    email_row_html += '</span></div></th><td class="right"><span class="badge ';
    email_row_html += data.badge.color;
    email_row_html += '">';
    email_row_html += data.badge.name;
    email_row_html += '</span></td><td>';
    email_row_html += data.email;
    email_row_html += '</td><td><i class="fa fa-paperclip" aria-hidden="true"></i></td><td>';
    if (today_email) {
      email_row_html += email_date_moment.format('h.mm A');
    } else {
      email_row_html += email_date_moment.format('MMM D');
    }
    email_row_html += '</td></tr>';
    return email_row_html;
  }
  function refreshEmailList() {
    let table = document.getElementById("tables");
    console.log(table);
    let table_body = table.getElementsByTagName("tbody");
    console.log(table_body);
    let email_html = '';
    let email_list=localStorage.getItem("email_list");
    if (email_list) {
      try {
        email_list = JSON.parse(email_list);
      } catch (e) {
        email_list = [];
      }
    } else {
      email_list = [];
    }
    let i;
    for (i = 0; i < email_list.length; i++) {
      email_html += genEmailRow(email_list[i]);
    }
    if (table_body && table_body.length>0) {
      table_body[0].innerHTML = email_html;
    }
  }
  window.onload = refreshEmailList()
  