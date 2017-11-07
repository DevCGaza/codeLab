import graphene
from ..models import Person,Group,Sent
from .types import PersonType,GroupType,SentType
class Query(graphene.ObjectType):
    people = graphene.List(PersonType)
    Group = graphene.List(GroupType)
    miner =graphene.List(SentType)
    def resolve_people(self,args,context,info):
        return  Person.objects.all()
    def resolve_Info(self,args,context,info):
        return Group.objects.all()
    def resolve_miner (self,args,context,info):
        return  Sent.objects.all()