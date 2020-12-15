import { AnalyticsClient } from '../../analytics';

export enum Event {
  BUILD_COMMAND = 'builds cli build command',
  PROJECT_UPLOAD_SUCCESS = 'builds cli project upload success',
  PROJECT_UPLOAD_FAIL = 'builds cli project upload fail',
  GATHER_CREDENTIALS_SUCCESS = 'builds cli gather credentials success',
  GATHER_CREDENTIALS_FAIL = 'builds cli gather credentials fail',
  CONFIGURE_PROJECT_SUCCESS = 'builds cli configure project success',
  CONFIGURE_PROJECT_FAIL = 'builds cli configure project fail',
  BUILD_REQUEST_SUCCESS = 'build cli build request success',
  BUILD_REQUEST_FAIL = 'builds cli build request fail',

  BUILD_STATUS_COMMAND = 'builds cli build status',

  CREDENTIALS_SYNC_COMMAND = 'builds cli credentials sync command',
  CREDENTIALS_SYNC_UPDATE_LOCAL_SUCCESS = 'builds cli credentials sync update local success',
  CREDENTIALS_SYNC_UPDATE_LOCAL_FAIL = 'builds cli credentials sync update local fail',
  CREDENTIALS_SYNC_UPDATE_REMOTE_SUCCESS = 'builds cli credentials sync update remote success',
  CREDENTIALS_SYNC_UPDATE_REMOTE_FAIL = 'builds cli credentials sync update remote fail',
}

const Analytics = new AnalyticsClient<Event>(
  process.env.EXPO_LOCAL || process.env.EXPO_STAGING
    ? '9qenkcMBJllh4gXYSN4BfJjJNPT7PULm'
    : 'TbWjTSn84LrRhfVEAfS6PG1wQoSCUYGp'
);

export default Analytics;
