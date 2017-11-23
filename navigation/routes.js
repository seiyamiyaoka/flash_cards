import History from '../components/History'
import NewDeck from '../components/NewDeck'
import AddCard from '../components/AddCard'
import DetailQuestion from '../components/DetailQuestion'
import QuestionForm from '../components/QuestionForm'
import { TabNavigator, StackNavigator } from 'react-navigation'

const Tabs = TabNavigator({
  Questions: {
    screen: History,
    tabBarLabel: 'Question',
    tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
  },
  NewDeck: {
    screen: NewDeck,
    tabBarLabel: 'NewDeck',
    tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
  },
})

export const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DetailQuestion: {
    screen: DetailQuestion
  },
  AddCard: {
    screen: AddCard
  },
  QuestionForm: {
    screen: QuestionForm
  }
})
