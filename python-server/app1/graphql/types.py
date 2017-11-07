import graphene
from graphene_django import DjangoObjectType
from ..models import Person,Group,Sent
class GroupType(DjangoObjectType):
    class Meta:
        model=Group
class PersonType(DjangoObjectType):
    class Meta:
        model =  Person
class SentType(DjangoObjectType):
    class Meta:
        model = Sent