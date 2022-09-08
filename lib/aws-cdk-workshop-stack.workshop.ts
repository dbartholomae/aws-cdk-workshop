import S3 from 'aws-sdk/clients/s3';

const s3 = new S3()

export async function handler() {
  const objects = await s3.listObjects({ Bucket: process.env.BUCKET_NAME! }).promise()
  const notes = objects.Contents!.map(content => content.Key);
  return {
    statusCode: 200,
    body: notes.length === 0 ? "No notes" : notes.join(', ')
  };
}
