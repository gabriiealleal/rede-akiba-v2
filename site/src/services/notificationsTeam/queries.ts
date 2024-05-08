import { useQuery } from '@tanstack/react-query';
import { NotificationParams } from '@/services/notificationsTeam/interfaces.ts';
import { getNotificationsTeam } from './api.ts';

export const useNotificationsTeam = (queryParams: NotificationParams) => {
    return useQuery({
        queryKey: ['notificationsTeam'],
        queryFn: () => getNotificationsTeam(queryParams),
        enabled: !!queryParams,
        retry: false,
    })
}