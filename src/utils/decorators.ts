import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

interface ApiStatuses {
  [key: number]: unknown;
}

function isClass(v: () => void): boolean {
  return typeof v === 'function' && /^\s*class\s+/.test(v.toString());
}

export function ApiResponses(
  statuses: ApiStatuses,
): <TFunction extends () => void, Y>(
  target: object | TFunction,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>,
) => void {
  const decorators = [];
  Object.keys(statuses).forEach((statusCode) => {
    if (
      Array.isArray(statuses[statusCode]) &&
      statuses[statusCode]?.every((x: () => void) => !isClass(x))
    ) {
      decorators.push(...statuses[statusCode]);
    } else
      decorators.push(
        ApiResponse({ status: +statusCode, type: statuses[statusCode] }),
      );
  });

  return applyDecorators(...decorators);
}
