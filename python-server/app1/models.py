from django.db import models





class Group(models.Model):
    name = models.CharField(max_length=200)
    def __str__(self):
        return self.name
class Person(models.Model):
    name = models.CharField(max_length=200)
    def __str__(self):
        return self.name
class Sent(models.Model):
    text = models.TextField()
    about = models.CharField(max_length=100)
    link  = models.URLField()
    def __str__(self):
        return self.about