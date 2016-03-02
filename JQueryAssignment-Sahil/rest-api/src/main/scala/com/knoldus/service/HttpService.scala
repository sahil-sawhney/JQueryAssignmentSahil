package com.knoldus.service

import akka.actor.ActorSystem
import akka.http.scaladsl.Http

import akka.stream.ActorMaterializer
import com.knoldus.repo.repo.{StudentRepository, Student}

//import scala.concurrent.ExecutionContext.Implicits.global


object HttpService extends App with Routes with FakeRepo {

  implicit val system = ActorSystem()
  implicit val materializer = ActorMaterializer()

  Http().bindAndHandle(route, "localhost", 9000)



}

trait FakeRepo extends StudentRepository {

  var studentResultList:List[Student]=List(Student(1,"sahil sawhney","sahilsawhney@knoldus.in"),Student(2,"akash sethi","akashsethi@knoldus.in"))

  def create(student:Student):Student={

    studentResultList=studentResultList:::List(student)
    student
  }

  def getById(id:Int):Student = {

    def compute(list:List[Student],stuId:Int=id):Student= {

      list match {
        case head :: tail => if (head.id == stuId) head else compute(tail)
        case _ => Student(-1,"","")
      }
    }
    val result=compute(studentResultList)
    result
  }

  def getAll():List[Student]=studentResultList

}
