/**
 * @jest-environment node
 */
import mongoose from 'mongoose';
import dbConnect from '@/lib/dbConnect';

describe('dbConnect()', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call mongoose.connect when not connected', async () => {
    const spyConnect = jest.spyOn(mongoose, 'connect').mockResolvedValueOnce(mongoose);
    const check = jest.fn(() => false); // simulate disconnected

    await dbConnect(check);

    expect(check).toHaveBeenCalled();
    expect(spyConnect).toHaveBeenCalledTimes(1);
  });

  it('should NOT call mongoose.connect when already connected', async () => {
    const spyConnect = jest.spyOn(mongoose, 'connect');
    const check = jest.fn(() => true); // simulate already connected

    await dbConnect(check);

    expect(check).toHaveBeenCalled();
    expect(spyConnect).not.toHaveBeenCalled();
  });
});
