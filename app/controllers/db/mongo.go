package db

import (
	"fmt"
	"strings"

	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type Quiz struct {
	ID       bson.ObjectId `bson:"_id" json:"_id"`
	Question string        `bson:"question" json:"question"`
	Answer   string        `bson:"answer" json:"answer"`
}

type Person struct {
	ID      bson.ObjectId `bson:"_id" json:"_id"`
	Name    string        `bson:"name" json:"name"`
	Correct int           `bson:"correct" json:"correct"`
	All     int           `bson:"all" json:"all"`
}

func Insert(q, a string) {
	session, _ := mgo.Dial("mongodb://heroku_l5485t46:53jo7hmb2arflet8e7v4kvgb19@ds151558.mlab.com:51558/heroku_l5485t46")
	defer session.Close()
	db := session.DB("test")
	quiz := &Quiz{
		bson.NewObjectId(),
		q,
		a,
	}
	db.C("quiz").Insert(quiz)
}

func Show() ([]Quiz, error) {
	session, _ := mgo.Dial("mongodb://heroku_l5485t46:53jo7hmb2arflet8e7v4kvgb19@ds151558.mlab.com:51558/heroku_l5485t46")
	defer session.Close()
	db := session.DB("test")
	result := []Quiz{}
	err := db.C("quiz").Find(bson.M{}).All(&result)
	if err != nil {
		fmt.Println(err)
		return result, err
	}
	return result, nil
}

func AddResult(name string, correct, all int) {
	session, _ := mgo.Dial("mongodb://heroku_l5485t46:53jo7hmb2arflet8e7v4kvgb19@ds151558.mlab.com:51558/heroku_l5485t46")
	defer session.Close()
	db := session.DB("test")
	person := &Person{
		bson.NewObjectId(),
		name,
		correct,
		all,
	}
	db.C("person").Insert(person)
}

func ShowResult(namess string, number int) ([]Person, error) {
	session, _ := mgo.Dial("mongodb://localhost/test")
	defer session.Close()
	db := session.DB("test")
	names := strings.Split(namess, "+")
	result := []Person{}
	res := make(chan Person, len(names))
	for _, name := range names {
		go func(db *mgo.Database, num int, n string, res chan Person) {
			person := Person{}
			err := db.C("person").Find(bson.M{"$and": []interface{}{
				bson.M{"all": number},
				bson.M{"name": name}}}).One(&person)
			if err != nil {
				fmt.Println(err)
			}
			res <- person
		}(db, number, name, res)
	}
	for _ = range names {
		person := <-res
		fmt.Println(person)
		result = append(result, person)
		/*person := Person{}
		err := db.C("person").Find(bson.M{"$and": []interface{}{
			bson.M{"all": number},
			bson.M{"name": name}}}).One(&person)
		if err != nil {
			fmt.Println(err)
		}
		result = append(result, person)*/
	}
	return result, nil
}
