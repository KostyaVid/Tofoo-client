import { renderHook } from '@testing-library/react';
import { act } from '@testing-library/react';
import { useServerErrorForms } from './useServerErrorForm';

describe('Hook', () => {
  test('useServerErrorForms should return null', () => {
    const { result } = renderHook(() => useServerErrorForms());
    expect(result.current).toContain(null);
  });

  test('useServerErrorForms should return errorState and call setState after 5 sec', async () => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');

    const { result, rerender } = renderHook(() => useServerErrorForms());
    act(() => {
      result.current[1]('errorState');
    });

    rerender();
    expect(result.current).toContain('errorState');
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 5000);
  });
});
