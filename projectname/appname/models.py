from django.db import models

class User1(models.Model):
 
   name = models.CharField(max_length=255)
   password=models.CharField(max_length=255)
   age = models.IntegerField()
   email = models.EmailField(unique=True)
   phone = models.CharField(max_length=100)
   job = models.CharField(max_length=100)
   salary = models.IntegerField()
   usertype=models.IntegerField()
 
class Jobdetail(models.Model):
   email_id=models.EmailField(max_length=255)
   message=models.CharField(max_length=255)
   comp_name=models.CharField(max_length=255)
   job_name=models.CharField(max_length=255)
   role=models.CharField(max_length=100)
   experience=models.CharField(max_length=50)
   salary_ran=models.CharField(max_length=20)
   location=models.CharField(max_length=50)
   job_des=models.CharField(max_length=250)
   notice_period=models.CharField(max_length=100)
   job_type=models.CharField(max_length=100)
   qualification=models.CharField(max_length=100)  



   

