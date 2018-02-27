package controllers

import (
	"fmt"
	"math/rand"
	"strconv"
	"time"

	mongo "GoRequest/app/controllers/db"

	"github.com/revel/revel"
)

type App struct {
	*revel.Controller
}

type Person struct {
	Name string `json:"name"`
	Age  int64  `json:"age"`
}

func (c App) GetJson() revel.Result {
	rand.Seed(time.Now().UnixNano())
	people := []string{"Takashi", "Yudai", "Fumimasa", "tenntenn", "Hiroshi"}
	p := &Person{people[rand.Intn(5)], rand.Int63n(100)}
	return c.RenderJSON(p)
}

func (c App) AddQuiz() revel.Result {
	q := c.Params.Get("Question")
	a := c.Params.Get("Answer")
	mongo.Insert(q, a)
	return c.RenderText("true")
}

func (c App) ShowQuiz() revel.Result {
	quiz, err := mongo.Show()
	if err != nil {
		fmt.Println(err)
		return c.RenderJSON(err)
	}
	return c.RenderJSON(quiz)
}

func (c App) SendResult() revel.Result {
	name := c.Params.Get("Name")
	correct := c.Params.Get("Correct")
	all := c.Params.Get("All")
	cor, _ := strconv.Atoi(correct)
	all2, _ := strconv.Atoi(all)
	mongo.AddResult(name, cor, all2)
	return c.RenderText("true")
}

func (c App) ShowPerson() revel.Result {
	names := c.Params.Get("Names")
	number := c.Params.Get("Number")
	n, _ := strconv.Atoi(number)
	person, err := mongo.ShowResult(names, n)
	if err != nil {
		fmt.Println(err)
		return c.RenderJSON(err)
	}
	return c.RenderJSON(person)
}

func (c App) Index() revel.Result {
	return c.Render()
}
