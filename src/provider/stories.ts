import { AnyAction, Dispatch, Store } from 'redux'
import { getCurrentAccessPolicy } from './api'
import {
  getServiceAction,
  setAccessPolicyAction,
  setIdentityAction,
  setIdentityPayoutAction,
  setLocationAction,
  setProviderStateAction,
  startServiceAction,
  stopServiceAction,
  unlocksIdentityAction,
  updateIdentitiesAction
} from './actions'
import { ProviderReducer, TrafficOptions } from './reducer'
import { Service, ServiceOptions, ServiceTypes } from '../api/data/service'

export const initProviderStory = (store: Store) => {

  Promise.all([
    fetchLocationStory(store.dispatch),
    fetchIdentityStory(store.dispatch),
    fetchServiceStory(store.dispatch)]
  ).catch(console.error)

  startAccessPolicyFetchingStory(store.dispatch).catch(console.error)
}

export const fetchIdentityStory = async (dispatch: Dispatch) => {
  const { value: identity } = (await dispatch(setIdentityAction())) as AnyAction

  console.log('fetchIdentityStory', identity)

  if (identity) dispatch(setIdentityPayoutAction(identity))

  return identity
}

export const fetchLocationStory = async (dispatch: Dispatch) => dispatch(setLocationAction())

export const fetchServiceStory = async (dispatch: Dispatch) => dispatch(getServiceAction())

let _accessPolicyInterval

export const startAccessPolicyFetchingStory = async (dispatch: Dispatch) => {

  let failedCount = 0
  const ALLOWED_FAILS = 10000

  const fetch = async () => {
    const accessPolicy = await getCurrentAccessPolicy()
    if (accessPolicy) {
      failedCount = 0
      dispatch(setAccessPolicyAction(accessPolicy))
      return
    }

    failedCount++

    if (failedCount > ALLOWED_FAILS) {
      dispatch(setAccessPolicyAction(null))
    }
  }

  fetch().catch(console.error)

  if (!_accessPolicyInterval) {
    _accessPolicyInterval = setInterval(fetch, 3000)
  }
}

export const stopAccessPolicyFetchingStory = () => {
  clearInterval(_accessPolicyInterval)
}

export const startVpnServerStory = async (dispatch: Dispatch, provider: ProviderReducer) => {
  const providerId = provider.identity && provider.identity.id
  const type = ServiceTypes.OPENVPN ///TODO: tmp
  const accessPolicyId = (provider.trafficOption === TrafficOptions.SAFE && provider.accessPolicy)
    ? provider.accessPolicy.id
    : undefined
  const options: ServiceOptions = undefined

  const service: Service = await dispatch(startServiceAction({ providerId, type, accessPolicyId, options }))

  console.log('startVpnServerStory:', service)

  if (service && service.id) {
    stopAccessPolicyFetchingStory()
  }

}

export const stopVpnServerStory = async (dispatch: Dispatch, service: Service) => {
  if (!service) return

  await dispatch(stopServiceAction(service))

  return startAccessPolicyFetchingStory(dispatch)
}

export const updateIdentitiesStory = async (
  dispatch: Dispatch, data: { passphrase: string, id: string, ethAddress: string }) => {
  const { id, passphrase, ethAddress } = data
  console.log({ id, passphrase, ethAddress })
  await dispatch(unlocksIdentityAction({ id, passphrase }))
  await dispatch(updateIdentitiesAction({ id, ethAddress }))
  await dispatch(setProviderStateAction({ isWalletEditMode: false }))
}

