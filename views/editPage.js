const html = require("html-template-tag");
const layout = require("./layout");

module.exports = (page, author) => layout(html`
  <h3>Edit a Page</h3>
  <hr>
  <form method="POST" action="/wiki/${page.slug}">

    <div><input type="text" value="${author.name}" name="name"/>Author</div>
    
    <div><input type="text" value="${author.email}" name="email"/>email</div>

    <div class="form-group">
      <label for="title" class="col-sm-2 control-label">Page Title</label>
      <div class="col-sm-10">
      <p><input type="text" value="${page.title}" name="title"></p>
      </div>
    </div>

    <div><input type="text" value="${page.content}" name="content"></div>

    <div class="form-group">
      <label for="content" class="col-sm-2 control-label">Status</label>
      <div class="col-sm-10">
        <select name="status">
          <option ${page.status == "open" ? "selected" : ""}>open</option>
          <option ${page.status == "closed" ? "selected" : ""}>closed</option>
        </select>
      </div>
    </div>

    <div class="col-sm-offset-2 col-sm-10">
        <button type="submit" class="btn btn-primary">submit</button>
    </div>
  </form>
`);
