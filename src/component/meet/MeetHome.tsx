import { MeetUserHeader } from './MeetUserHeader'
import { MeetList } from './MeetList'

export const MeetHome = () => {
  return (
    <>
      <div className="container-principal">
        <div className="container-meet">
          <MeetUserHeader />
          <MeetList />
        </div>
      </div>
    </>
  )
}
