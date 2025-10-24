import { NextResponse } from 'next/server';

type RecaptchaResponse = {
  success: boolean;
  score?: number;
  action?: string;
  'error-codes'?: string[];
};

type RecaptchaEnterpriseAssessment = {
  riskAnalysis?: {
    score?: number;
    reasons?: string[];
  };
  tokenProperties?: {
    valid: boolean;
    action?: string;
    invalidReason?: string;
  };
};

const EXPECTED_ACTION = 'contact_submit';
const DEFAULT_THRESHOLD = 0.5;

export async function POST(request: Request) {
  let body: { token?: string; action?: string };
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json(
      { success: false, message: '無効なリクエスト形式です。' },
      { status: 400 }
    );
  }

  const { token, action } = body;
  if (!token) {
    return NextResponse.json(
      { success: false, message: 'reCAPTCHAトークンが見つかりません。' },
      { status: 400 }
    );
  }

  const expectedAction = action ?? EXPECTED_ACTION;
  const threshold = Number(process.env.RECAPTCHA_SCORE_THRESHOLD ?? DEFAULT_THRESHOLD);
  const siteKey = process.env.NEXT_PUBLIC_SITE_RECAPTCHA_KEY;
  const enterpriseProjectId = process.env.RECAPTCHA_ENTERPRISE_PROJECT_ID;
  const enterpriseApiKey = process.env.RECAPTCHA_ENTERPRISE_API_KEY;

  if (enterpriseProjectId && enterpriseApiKey) {
    if (!siteKey) {
      return NextResponse.json(
        { success: false, message: 'reCAPTCHAサイトキーがサーバー側で利用できません。' },
        { status: 500 }
      );
    }

    const verifyResponse = await fetch(
      `https://recaptchaenterprise.googleapis.com/v1/projects/${enterpriseProjectId}/assessments?key=${enterpriseApiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: {
            token,
            siteKey,
            expectedAction,
          },
        }),
      }
    );

    if (!verifyResponse.ok) {
      return NextResponse.json(
        { success: false, message: 'reCAPTCHA検証サーバーへの接続に失敗しました。' },
        { status: 502 }
      );
    }

    const verifyJson = (await verifyResponse.json()) as RecaptchaEnterpriseAssessment;

    if (!verifyJson.tokenProperties?.valid) {
      return NextResponse.json(
        {
          success: false,
          message: 'reCAPTCHAの検証に失敗しました。時間をおいて再度お試しください。',
          errors: verifyJson.tokenProperties?.invalidReason
            ? [verifyJson.tokenProperties.invalidReason]
            : undefined,
        },
        { status: 400 }
      );
    }

    const tokenAction = verifyJson.tokenProperties.action;
    if (tokenAction && tokenAction !== expectedAction) {
      return NextResponse.json(
        { success: false, message: 'reCAPTCHAアクションが一致しません。' },
        { status: 400 }
      );
    }

    const score = typeof verifyJson.riskAnalysis?.score === 'number' ? verifyJson.riskAnalysis.score : 0;

    if (Number.isFinite(threshold) && score < threshold) {
      return NextResponse.json(
        {
          success: false,
          message: 'reCAPTCHAスコアが基準値を下回りました。恐れ入りますが後ほど再度お試しください。',
          score,
          reasons: verifyJson.riskAnalysis?.reasons,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, score, reasons: verifyJson.riskAnalysis?.reasons });
  }

  const secret = process.env.SITE_RECAPTCHA_SECRET;
  if (!secret) {
    return NextResponse.json(
      { success: false, message: 'reCAPTCHAシークレットキーが設定されていません。' },
      { status: 500 }
    );
  }

  const params = new URLSearchParams();
  params.set('secret', secret);
  params.set('response', token);

  const verifyResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });

  if (!verifyResponse.ok) {
    return NextResponse.json(
      { success: false, message: 'reCAPTCHA検証サーバーへの接続に失敗しました。' },
      { status: 502 }
    );
  }

  const verifyJson = (await verifyResponse.json()) as RecaptchaResponse;

  if (!verifyJson.success) {
    return NextResponse.json(
      {
        success: false,
        message: 'reCAPTCHAの検証に失敗しました。時間をおいて再度お試しください。',
        errors: verifyJson['error-codes'],
      },
      { status: 400 }
    );
  }

  if (verifyJson.action && verifyJson.action !== expectedAction) {
    return NextResponse.json(
      { success: false, message: 'reCAPTCHAアクションが一致しません。' },
      { status: 400 }
    );
  }

  const score = typeof verifyJson.score === 'number' ? verifyJson.score : 0;

  if (Number.isFinite(threshold) && score < threshold) {
    return NextResponse.json(
      {
        success: false,
        message: 'reCAPTCHAスコアが基準値を下回りました。恐れ入りますが後ほど再度お試しください。',
        score,
      },
      { status: 400 }
    );
  }

  return NextResponse.json({ success: true, score });
}
