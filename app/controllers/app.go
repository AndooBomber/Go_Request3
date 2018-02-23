package controllers

import (
	"math/rand"
	"time"

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

func (c App) Index() revel.Result {
	return c.Render()
}
