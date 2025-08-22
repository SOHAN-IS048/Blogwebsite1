const express = require('express');
const methodOverride = require('method-override');
const app = express();

// Sample static articles (replace with your own)
let articles = [
    {
        title: "First Article",
        description: "This is the first article",
        createdAt: new Date()
    },
    {
        title: "Second Article",
        description: "This is the second article",
        createdAt: new Date()
    }
];

app.set("views", "./view");
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// Home route
app.get('/', (req, res) => {
    // Sort articles by createdAt descending
    const sortedArticles = articles.sort((a, b) => b.createdAt - a.createdAt);
    res.render('articles/index', { articles: sortedArticles });
});

// Route for adding articles
app.get('/articles/new', (req, res) => {
    res.render('articles/new', { article: {} });
});

app.post('/articles', (req, res) => {
    const { title, description } = req.body;
    articles.push({
        title,
        description,
        createdAt: new Date()
    });
    res.redirect('/');
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server started on port 3000");
});

