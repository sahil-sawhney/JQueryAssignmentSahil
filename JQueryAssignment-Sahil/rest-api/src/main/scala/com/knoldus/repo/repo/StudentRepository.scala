package com.knoldus.repo.repo


trait StudentRepository {

  def create(student:Student):Student

  def getById(id:Int):Student

  def getAll():List[Student]

  var studentResultList:List[Student]

}


case class Student(id:Int, name:String ,email:String)
