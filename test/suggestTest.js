const helper = require('./base');

// Supertest API Wrapper
const api = helper.api;
const path = helper.config.prefix + '/suggest';

/**
 * Test Question
 * @type {{difficulty: string, kind: string, answers: *[], code_block: string, title: string, explanation: string, category: string, resolution: number[], tags: string[]}}
 */
const multipleChoiceQuestion = {
  "title": "Which of the following are Linux filesystems and are supported directly by the Kernel?",
  "explanation": "",
  "code_block": "",
  "kind": "multiple",
  "difficulty": "4",
  "answers": [
    {
      "content": "FAT",
      "explanation": "No FAT is a windows file system (which Linux can use)."
    },
    {
      "content": "NTFS",
      "explanation": "NTFS is a windows file system (which Linux can use)."
    },
    {
      "content": "Ext4",
      "explanation": "Correct, Ext4 is a Linux filesystem."
    },
    {
      "content": "Btrfs",
      "explanation": "Btrfs is a Linux filesystem."
    },
    {
      "content": "exFAT",
      "explanation": "No"
    },
    {
      "content": "ZFS",
      "explanation": "This is tricky, the license ZFS is licensed under (CDDL) is not compatible to the GPLv2 the Linux Kernel uses, because of that ZFS support is not shipped in Linux directly."
    }
  ],
  "category": "lpic-101",
  "tags": ["Filesystem"],
  "resolution": [
    2,
    3
  ]
};

const textInputQuestion = {
  "title": "Which Environment Variable holds the standard editor?",
  "explanation": "The EDITOR variable holds the default editor for many cli application like crontab.",
  "code_block": "10 * * * * test",
  "kind": "text",
  "difficulty": "4",
  "answers": [],
  "tags": ["Bash"],
  "category": "lpic-101",
  "resolution": [
    "EDITOR"
  ]
};

const singleChoiceQuestion = {
  "title": "Which of the following commands allows you to change the nice value of a running command?",
  "category": "lpic-101",
  "tags": ["Command", "Nice"],
  "explanation": "",
  "code_block": "",
  "kind": "single",
  "difficulty": "4",
  "answers": [
    {
      "content": "nice",
      "explanation": "With nice you can set the value BEFORE starting it."
    },
    {
      "content": "ps",
      "explanation": "ps shows running processes."
    },
    {
      "content": "top",
      "explanation": "Yes, top allows you to change the nice value. Just like the renice command."
    },
    {
      "content": "rn",
      "explanation": "This command does not exist."
    },
    {
      "content": "watch",
      "explanation": "watch allows you to periodically execute a command."
    }
  ],
  "resolution": [
    2
  ]
};

/**
 * Test suite for /suggest
 */
describe('POST /suggest', () => {
  it('Should only accept post', async () => {
    const result = await api
      .get(path)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send();

    result.type.should.equal('application/json');
    result.statusCode.should.equal(404);
  });

  it('Should throw an error on invalid input', async () => {
    const request = {
      test: 42,
    };

    const result = await api
      .post(path)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(request);

    result.type.should.equal('application/json');
    result.statusCode.should.equal(405);
  });

  it('Should 200 to an valid request', async () => {
    // Sample question from the suggest form
    const result = await api
      .post(path)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(JSON.stringify(multipleChoiceQuestion));

    result.statusCode.should.equal(200);
    result.body.should.be.a('object');

    // We should get an id
    result.body._id.should.be.a('string');

    // Dates should be set
    result.body.created.should.be.a('string');
    result.body.updated.should.be.a('string');

    // Published should be false!
    result.body.published.should.equal(false);
  });

  it('Suggested Question should be always unpublished', async () => {
    let sample = JSON.parse(JSON.stringify(multipleChoiceQuestion));

    sample.published = true;

    // Sample question from the suggest form
    const result = await api
      .post(path)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(JSON.stringify(sample));

    result.statusCode.should.equal(200);

    // Published should be false!
    result.body.published.should.equal(false);
  });

  it('Suggested Question requires title', async () => {
    let sample = JSON.parse(JSON.stringify(multipleChoiceQuestion));

    delete sample.title;

    // Sample question from the suggest form
    const result = await api
      .post(path)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(JSON.stringify(sample));

    result.statusCode.should.equal(405);
    result.body.error.should.be.a('object')
  });

  it('Suggested Question requires kind', async () => {
    let sample = JSON.parse(JSON.stringify(multipleChoiceQuestion));

    delete sample.kind;

    // Sample question from the suggest form
    const result = await api
      .post(path)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(JSON.stringify(sample));

    result.statusCode.should.equal(405);
    result.body.error.should.be.a('object')
  });

  it('Suggested Question needs a valid kind (kind is an enum)', async () => {
    let sample = JSON.parse(JSON.stringify(multipleChoiceQuestion));

    sample.kind = 'Something';

    // Sample question from the suggest form
    const result = await api
      .post(path)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(JSON.stringify(sample));

    result.statusCode.should.equal(405);
    result.body.error.should.be.a('object')
  });

  it('Works with text Questions', async () => {
    const result = await api
      .post(path)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(JSON.stringify(textInputQuestion));

    result.statusCode.should.equal(200);
    result.body.should.be.a('object');

    // We should get an id
    result.body._id.should.be.a('string');

    // Dates should be set
    result.body.created.should.be.a('string');
    result.body.updated.should.be.a('string');

    // Published should be false!
    result.body.published.should.equal(false);
  });

  it('Works with single Choice Questions', async () => {
    const result = await api
      .post(path)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(JSON.stringify(singleChoiceQuestion));

    result.statusCode.should.equal(200);
    result.body.should.be.a('object');

    // We should get an id
    result.body._id.should.be.a('string');

    // Dates should be set
    result.body.created.should.be.a('string');
    result.body.updated.should.be.a('string');

    // Published should be false!
    result.body.published.should.equal(false);
  });
});
