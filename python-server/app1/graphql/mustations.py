from ..models import Person,Group
from .types import PersonType,GroupType
import graphene
class PersonMutations(graphene.Mutation):
    class Input:
        name = graphene.String()
    person = graphene.Field(PersonType)
    @staticmethod
    def mutate(root,args,context,info):
        person = Person(name=args.get('name'))
        person.save()
        return PersonMutations(person=person)
class GroupMutations(graphene.Mutation):
    class Input:
        name = graphene.String()
    group = graphene.Field(GroupType)
    @staticmethod
    def mutate(root,args,context,info):
        group = Group(name=args.get("name"))
        group.save()
        return GroupMutations(group=group)

class Mutations(graphene.ObjectType):
    createPerson = PersonMutations.Field()
    createGroup = GroupMutations.Field()

