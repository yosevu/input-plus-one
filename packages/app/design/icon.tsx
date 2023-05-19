import { MaterialIcons as NativeIcons } from '@expo/vector-icons'
import { styled } from 'nativewind'
import { type ReactElement } from 'react'

const Icon = styled(NativeIcons)

export const SearchIcon = (): ReactElement => <Icon name="search" size={30} color="#FFFFFF" className="mr-2" />
export const ListIcon = (): ReactElement => <Icon name="list" size={30} color="#FFFFFF" className="mr-2" />
export const DeleteIcon = (): ReactElement => <Icon name="swap-horiz" size={30} color="#FFFFFF" className="mr-1" />
