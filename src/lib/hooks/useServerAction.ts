import { startTransition, useActionState, useCallback } from 'react';

type TActionReturn<State> = State | Promise<State | undefined> | undefined;
type TAction<State, Payload> = (
  state: Awaited<State> | undefined,
  payload: Payload,
) => TActionReturn<State>;
type TServerActionReturn<State, Payload> = [
  state: Awaited<State> | undefined,
  action: (payload: Payload) => void,
  isPending: boolean,
];

function constructAction<State, Payload>(
  action: (payload: Payload) => TActionReturn<State>,
): TAction<State, Payload> {
  return (_: Awaited<State> | undefined, payload: Payload) => action(payload);
}

export function useServerAction<State, Payload>(
  action: (payload: Payload) => TActionReturn<State>,
): TServerActionReturn<State, Payload> {
  const [state, dispatch, isPending] = useActionState(
    constructAction(action),
    undefined,
  );

  const actionInTransition = useCallback(
    (payload: Payload) => {
      startTransition(() => dispatch(payload));
    },
    [dispatch],
  );

  return [state, actionInTransition, isPending];
}
