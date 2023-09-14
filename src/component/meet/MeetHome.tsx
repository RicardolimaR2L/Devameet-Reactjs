import { MeetUserHeader } from './MeetUserHeader'
import { MeetList } from './meetList'

export const MeetHome = () => {
  return (
    <>
      <div className="container-principal">
        <div className="container-meet">
          <MeetUserHeader />
          <MeetList/>
        </div>
      </div>
    </>
  )
}
