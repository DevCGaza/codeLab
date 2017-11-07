from .queries import Query
from .mustations import Mutations
import graphene
schema = graphene.Schema(query=Query,mutation=Mutations)